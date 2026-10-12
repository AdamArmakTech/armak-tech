/**
 * Converts the partner logos in /public into uniform single-color (ink) PNGs in
 * src/assets/partners/, trimmed and height-normalized for the proof strip.
 *
 *   node scripts/prepare-logos.mjs
 *
 * Near-white pixels become transparent (kills "removebg" halos and white knockouts);
 * every other pixel becomes ink with its original alpha.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const INK = { r: 11, g: 13, b: 16 };
const OUT_HEIGHT = 160; // 2x of the largest display height
const WHITE_CUTOFF = 0.82; // relative luminance above this → transparent

const logos = {
  cisco: 'partner-cisco.png',
  meraki: 'Merakilogovector-removebg-preview.png',
  fortinet: 'Fortinetlogotransparent-removebg-preview.png',
  aruba: 'Arubalogovector-removebg-preview.png',
  ubiquiti: 'partner-ubiquiti.webp',
  axis: 'axislogovector-removebg-preview.png',
  bosch: 'boschlogovector-removebg-preview.png',
  hikvision: 'partner-hikvision.png',
  lts: 'partner-lts.png',
  honeywell: 'Honeywelllogovector-removebg-preview.png',
  commscope: 'Commscopelogovector-removebg-preview.png',
  panduit: 'panduitlogovector-removebg-preview.png',
  crestron: 'crestronlogovector-removebg-preview-removebg-preview.png',
  netgear: 'partner-netgear.png',
};

await mkdir('src/assets/partners', { recursive: true });

for (const [name, file] of Object.entries(logos)) {
  const { data, info } = await sharp(`public/${file}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    // Soft edge between ink and transparent to keep anti-aliasing smooth
    const keep = lum > WHITE_CUTOFF ? 0 : lum > WHITE_CUTOFF - 0.08 ? (WHITE_CUTOFF - lum) / 0.08 : 1;
    data[i] = INK.r;
    data[i + 1] = INK.g;
    data[i + 2] = INK.b;
    data[i + 3] = Math.round(data[i + 3] * keep);
  }

  const out = `src/assets/partners/${name}.png`;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ height: OUT_HEIGHT, withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`${name.padEnd(10)} ${meta.width}x${meta.height}`);
}
