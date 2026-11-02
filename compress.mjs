import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "src/assets";
const pngs = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));

for (const f of pngs) {
  const src = path.join(dir, f);
  const out = src.replace(/\.png$/, ".webp");
  await sharp(src)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  fs.unlinkSync(src);
  console.log(`${f} -> ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );

for (const file of walk("src").filter((f) => /\.(ts|tsx)$/.test(f))) {
  let c = fs.readFileSync(file, "utf8");
  const orig = c;
  for (const f of pngs) c = c.replaceAll(`assets/${f}"`, `assets/${f.replace(/\.png$/, ".webp")}"`);
  if (c !== orig) {
    fs.writeFileSync(file, c);
    console.log("Imports actualizados:", file);
  }
}