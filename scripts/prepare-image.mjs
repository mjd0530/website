// Prepare a design export for the site (originals live in design/source/, git-ignored).
// Boards: trim built-in margins so their content fills the card.
// 1) drop a thin inset (removes rounded frame strokes / corners),
// 2) repeatedly trim each edge's background colour until nothing changes,
// 3) add back an even margin (2% of width) in the dominant edge colour, 4) cap at 3200px.
// Usage: npm run image -- <original> <web-copy.png> [--photo]
//   --photo: skip trimming (photos and renders), just resize and convert.
// sharp ships with Astro (its image service), so no extra dependency.
import sharp from 'sharp';
sharp.cache(false);

const [, , input, output, flag] = process.argv;
if (!input || !output) {
  console.error('Usage: npm run image -- <original> <web-copy> [--photo]');
  process.exit(1);
}

if (flag === '--photo') {
  const out = await sharp(input, { limitInputPixels: false })
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);
  console.log(output.split('/').pop(), `${out.width}x${out.height}`);
  process.exit(0);
}
let buf = await sharp(input, { limitInputPixels: false })
  .resize({ width: 6400, withoutEnlargement: true })
  .flatten({ background: '#ffffff' })
  .png()
  .toBuffer();

const raw = async (b) => sharp(b).raw().toBuffer({ resolveWithObject: true });
const px = (r, x, y) => {
  const { data, info } = r;
  const i = (y * info.width + x) * info.channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
};

// 1) inset 1% to drop frame strokes and rounded corners
let m = await sharp(buf).metadata();
const inset = Math.round(Math.min(m.width, m.height) * 0.01);
buf = await sharp(buf)
  .extract({ left: inset, top: inset, width: m.width - 2 * inset, height: m.height - 2 * inset })
  .png()
  .toBuffer();

// 2) trim edge colours until stable
let edgeColour = { r: 255, g: 255, b: 255 };
for (let pass = 0; pass < 8; pass++) {
  const r = await raw(buf);
  const { width: w, height: h } = r.info;
  const samples = [
    px(r, Math.round(w / 2), 2),
    px(r, Math.round(w / 2), h - 3),
    px(r, 2, Math.round(h / 2)),
    px(r, w - 3, Math.round(h / 2)),
  ];
  let changed = false;
  for (const bg of samples) {
    const before = await sharp(buf).metadata();
    let next;
    try {
      next = await sharp(buf).trim({ background: bg, threshold: 14 }).png().toBuffer();
    } catch {
      continue;
    }
    const after = await sharp(next).metadata();
    if (after.width < before.width || after.height < before.height) {
      buf = next;
      edgeColour = bg;
      changed = true;
    }
  }
  if (!changed) break;
}

// 3) even margin
m = await sharp(buf).metadata();
const pad = Math.round(m.width * 0.02);
buf = await sharp(buf)
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: edgeColour })
  .png()
  .toBuffer();

// 4) web size
const out = await sharp(buf)
  .resize({ width: 3200, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(output);
const c = edgeColour;
console.log(
  output.split('/').pop(),
  `${out.width}x${out.height}`,
  `margin rgb(${c.r},${c.g},${c.b})`,
);
