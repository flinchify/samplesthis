#!/usr/bin/env node

/**
 * Flinchify MCP Server
 * 
 * Human usability testing for AI agents via Model Context Protocol.
 * Works with Claude Desktop, Cursor, and any MCP-compatible client.
 * 
 * Setup:
 *   FLINCHIFY_API_KEY=fk_... npx flinchify-mcp
 * 
 * Or add to claude_desktop_config.json:
 *   {
 *     "mcpServers": {
 *       "flinchify": {
 *         "command": "npx",
 *         "args": ["flinchify-mcp"],
 *         "env": { "FLINCHIFY_API_KEY": "fk_your_key" }
 *       }
 *     }
 *   }
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { request } from "https";

const API_BASE = "https://flinchify.com/api/v1";
const API_KEY = process.env.FLINCHIFY_API_KEY;

if (!API_KEY) {
  console.error("Error: FLINCHIFY_API_KEY environment variable required");
  console.error("Get your key at https://flinchify.com/dashboard → API Keys");
  process.exit(1);
}

// HTTP helper — now returns { data, status }
function apiRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const opts = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "flinchify-mcp/0.2.0",
      },
    };
    const req = request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ data: parsed, status: res.statusCode });
        } catch {
          resolve({ data: { raw: data }, status: res.statusCode });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Check for API errors
function checkError(res) {
  if (res.status === 401) {
    return "Authentication failed. Check your FLINCHIFY_API_KEY is valid. Get a key at https://flinchify.com/dashboard → API Keys";
  }
  if (res.status === 403) {
    return "Access denied. Your API key may be revoked.";
  }
  if (res.status >= 500) {
    return `Server error (${res.status}): ${res.data?.message || "Please try again later."}`;
  }
  if (res.data?.error) {
    return `Error: ${res.data.message || res.data.error}`;
  }
  return null;
}

// Server setup
const server = new Server(
  { name: "flinchify", version: "0.2.0" },
  { capabilities: { tools: {} } }
);

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_test",
      description: "Create a human usability test job. Real humans will test the given URL, following the specified flow, and report back with issues, screen recordings, and friction notes. Requires pre-purchased credits for instant execution.",
      inputSchema: {
        type: "object",
        required: ["url"],
        properties: {
          url: { type: "string", description: "URL of the app or website to test" },
          flow: { type: "string", description: "What testers should do, e.g. 'sign up, create a project, invite a teammate'" },
          testers: { type: "number", description: "Number of human testers (default: 3, min: 1, max: 100)" },
          budget_per_tester: { type: "number", description: "Budget per tester in dollars (default: 10, min: 5)" },
          tasks: { type: "array", items: { type: "string" }, description: "Specific tasks for testers (alternative to flow)" },
          target_audience: { type: "string", description: "Ideal tester profile, e.g. 'developers who use React'" },
          time_limit_hours: { type: "number", description: "Hours for testers to complete (default: 24)" },
        },
      },
    },
    {
      name: "get_test_results",
      description: "Get results from a human usability test. Returns severity-ranked issues, tester feedback, screen recording URLs, and completion status. Use the test_id from create_test.",
      inputSchema: {
        type: "object",
        required: ["test_id"],
        properties: {
          test_id: { type: "string", description: "Test ID (e.g. ft_127)" },
        },
      },
    },
    {
      name: "list_tests",
      description: "List all your test jobs with their status and results summary.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "check_credits",
      description: "Check your Flinchify credit balance. Credits are used to pay for tests automatically without checkout interruptions.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "create_test": {
        const res = await apiRequest("POST", "/tests", {
          url: args.url,
          flow: args.flow || "General usability test",
          testers: args.testers || 3,
          budget_per_tester: args.budget_per_tester || 10,
          tasks: args.tasks,
          target_audience: args.target_audience,
          time_limit_hours: args.time_limit_hours || 24,
        });

        const err = checkError(res);
        if (err) return { content: [{ type: "text", text: err }] };

        const result = res.data;
        let text = `Test created!\n\nID: ${result.test_id}\nStatus: ${result.status}\nTesters: ${result.testers}\nTotal: $${result.total} ${result.currency?.toUpperCase() || "USD"}`;

        if (result.payment === "credits") {
          text += `\n\nPaid with credits. $${result.credits_used} used, $${result.credits_remaining} remaining.`;
          text += "\n\nTesters will be matched shortly. Check back with get_test_results.";
        } else {
          text += `\n\nPayment required: ${result.checkout_url}`;
          text += "\n\nThe user needs to complete payment at the URL above before testers are matched.";
        }

        return { content: [{ type: "text", text }] };
      }

      case "get_test_results": {
        const res = await apiRequest("GET", `/tests/${args.test_id}`);

        const err = checkError(res);
        if (err) return { content: [{ type: "text", text: err }] };

        const result = res.data;
        let text = `Test: ${result.test_id}\nURL: ${result.url}\nStatus: ${result.status}\nFlow: ${result.description}\nTesters: ${result.results?.testers_completed || 0}/${result.testers_requested} completed`;

        if (result.results?.issues?.length) {
          text += "\n\nIssues found:";
          result.results.issues.forEach((issue) => {
            text += `\n  [${issue.severity}] ${issue.description} — ${issue.tester}`;
          });
        }

        if (result.results?.recordings?.length) {
          text += "\n\nRecordings:";
          result.results.recordings.forEach(r => { text += `\n  ${r}`; });
        }

        if (!result.results?.issues?.length && !result.results?.recordings?.length) {
          text += "\n\nNo results yet — testers are still working on it.";
        }

        return { content: [{ type: "text", text }] };
      }

      case "list_tests": {
        const res = await apiRequest("GET", "/tests");

        const err = checkError(res);
        if (err) return { content: [{ type: "text", text: err }] };

        const result = res.data;
        if (!result.tests?.length) {
          return { content: [{ type: "text", text: "No tests yet. Use create_test to submit your first test job." }] };
        }

        let text = "Your tests:\n";
        result.tests.forEach(t => {
          text += `\n${t.test_id} [${t.status}] ${t.url}\n  ${t.testers} testers, ${t.accepted}/${t.testers} accepted, created ${new Date(t.created_at).toLocaleDateString()}\n`;
        });

        return { content: [{ type: "text", text }] };
      }

      case "check_credits": {
        const res = await apiRequest("GET", "/credits");

        const err = checkError(res);
        if (err) return { content: [{ type: "text", text: err }] };

        const result = res.data;
        let text = `Credit balance: $${result.balance || "0.00"}`;
        if (result.packs?.length) {
          text += "\n\nAvailable packs:";
          result.packs.forEach(p => {
            text += `\n  ${p.label}: ${p.credits} credits for ${p.price}`;
          });
          text += "\n\nBuy credits at https://flinchify.com/dashboard?tab=api";
        }

        return { content: [{ type: "text", text }] };
      }

      default:
        return { content: [{ type: "text", text: `Unknown tool: ${name}` }] };
    }
  } catch (error) {
    return { content: [{ type: "text", text: `Connection error: ${error.message}. Is flinchify.com reachable?` }] };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
