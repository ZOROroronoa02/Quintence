/**
 * @file scripts/generate-assets.js
 * @description Reproducible brand-asset exporter. Rasterizes the SVG sources in
 * public/ to PNG via a temporary sharp-cli run (pnpm dlx ~ never a project
 * dependency), then wraps the 32px favicon PNG in a legacy .ico container.
 * Run: pnpm assets
 *
 * NOTE: public/logo.png + logo-dark.png are NOT generated here ~ they are
 * cropped + theme-paired exports of the uploaded wordmark master (transparent
 * source art). Re-export from the master if the wordmark ever changes.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.join(__dirname, "..", "public");
const tmpDir = fs.mkdtempSync(path.join(require("os").tmpdir(), "quintence-assets-"));

function sharp(input, output, resizeArgs) {
  const out = path.join(tmpDir, path.basename(output));
  const cmd = `pnpm dlx sharp-cli -i "${input}" -o "${out}"${resizeArgs ? ` resize ${resizeArgs}` : ""}`;
  execSync(cmd, { stdio: "inherit" });
  fs.copyFileSync(out, output);
  console.log(`wrote ${path.relative(process.cwd(), output)}`);
}

/** Wraps a PNG buffer in a single-image .ico container (valid Vista+). */
function pngToIco(pngPath, icoPath, size) {
  const png = fs.readFileSync(pngPath);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const dir = Buffer.alloc(16);
  dir.writeUInt8(size, 0);
  dir.writeUInt8(size, 1);
  dir.writeUInt8(0, 2);
  dir.writeUInt8(0, 3);
  dir.writeUInt16LE(1, 4);
  dir.writeUInt16LE(32, 6);
  dir.writeUInt32LE(png.length, 8);
  dir.writeUInt32LE(22, 12);
  fs.writeFileSync(icoPath, Buffer.concat([header, dir, png]));
  console.log(`wrote ${path.relative(process.cwd(), icoPath)}`);
}

sharp(path.join(publicDir, "og-image.svg"), path.join(publicDir, "og-image.png"));
sharp(path.join(publicDir, "apple-touch-icon.svg"), path.join(publicDir, "apple-touch-icon.png"));
sharp(path.join(publicDir, "favicon.svg"), path.join(publicDir, "favicon-32x32.png"), "32 32");
sharp(path.join(publicDir, "favicon.svg"), path.join(publicDir, "favicon-16x16.png"), "16 16");
pngToIco(path.join(publicDir, "favicon-32x32.png"), path.join(publicDir, "favicon.ico"), 32);

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log("Brand assets exported.");
