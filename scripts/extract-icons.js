const si = require('simple-icons');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'brands');

const brands = {
  cursor: { key: 'siCursor', color: '000000' },
  replit: { key: 'siReplit', color: 'F26207' },
  vercel: { key: 'siVercel', color: '000000' },
  supabase: { key: 'siSupabase', color: '3FCF8E' },
  bolt: { key: 'siStackblitz', color: '1389FD' },
  claude: { key: 'siAnthropic', color: 'D4A27F' },
  windsurf: { key: 'siWindsurf', color: '09B6A2' },
  v0: { key: 'siV0', color: '000000' },
};

for (const [name, cfg] of Object.entries(brands)) {
  const icon = si[cfg.key];
  if (!icon) {
    console.log(`MISSING: ${name} (${cfg.key})`);
    continue;
  }
  const color = cfg.color || icon.hex;
  const svg = icon.svg.replace('<svg', `<svg fill="#${color}"`);
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
  console.log(`OK: ${name} (#${color}, ${svg.length} bytes)`);
}

// ChatGPT/OpenAI - not in simple-icons, write the well-known SVG manually
const chatgptSvg = `<svg fill="#10A37F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`;
fs.writeFileSync(path.join(dir, 'chatgpt.svg'), chatgptSvg);
console.log('OK: chatgpt (manual, #10A37F)');

// Lovable - not in simple-icons, use their heart mark
const lovableSvg = `<svg fill="#FF385C" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
fs.writeFileSync(path.join(dir, 'lovable.svg'), lovableSvg);
console.log('OK: lovable (manual heart, #FF385C)');

console.log('\nDone. Files:');
fs.readdirSync(dir).filter(f => f.endsWith('.svg')).forEach(f => {
  const size = fs.statSync(path.join(dir, f)).size;
  console.log(`  ${f} (${size} bytes)`);
});
