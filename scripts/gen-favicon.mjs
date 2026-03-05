import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "public");
const src = path.join(pub, "logo.png");

// Generate sizes
const sizes = [
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(pub, name));
  console.log(`✓ ${name}`);
}

// Generate ICO (just embed the 32x32 PNG as ico — browsers accept PNG-in-ICO)
const png32 = await sharp(src)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

// ICO format: header + directory entry + PNG data
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // ICO type
icoHeader.writeUInt16LE(1, 4); // 1 image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(32, 0);  // width
dirEntry.writeUInt8(32, 1);  // height
dirEntry.writeUInt8(0, 2);   // palette
dirEntry.writeUInt8(0, 3);   // reserved
dirEntry.writeUInt16LE(1, 4); // color planes
dirEntry.writeUInt16LE(32, 6); // bits per pixel
dirEntry.writeUInt32LE(png32.length, 8); // size
dirEntry.writeUInt32LE(22, 12); // offset (6 header + 16 dir)

const ico = Buffer.concat([icoHeader, dirEntry, png32]);
fs.writeFileSync(path.join(pub, "favicon.ico"), ico);
console.log("✓ favicon.ico");

console.log("Done!");
