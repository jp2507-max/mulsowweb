/*
  Optimize hero background image into modern formats.
  Input:  public/images/hero-bg.jpg (or .jpeg/.png)
  Output: public/images/hero-bg.avif, hero-bg.webp, hero-bg.jpg (progressive)

  Usage:
    npm run optimize:hero
*/

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMG_DIR = path.join(PUBLIC_DIR, 'images');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function findSource() {
  const candidates = ['hero-bg.jpg', 'hero-bg.jpeg', 'hero-bg.png'];
  for (const name of candidates) {
    const p = path.join(IMG_DIR, name);
    try {
      await fs.access(p);
      return p;
    } catch {}
  }
  return null;
}

async function tryCopyFromPublicFallback() {
  // If the uploaded file is in /public with a hash-like name, copy it.
  try {
    const entries = await fs.readdir(PUBLIC_DIR);
    const cand = entries.find((n) => /\.(jpg|jpeg|png)$/i.test(n) && /[a-f0-9-]{8,}/.test(n));
    if (!cand) return null;
    const src = path.join(PUBLIC_DIR, cand);
    const target = path.join(IMG_DIR, 'hero-bg' + path.extname(cand).toLowerCase());
    await ensureDir(IMG_DIR);
    await fs.copyFile(src, target);
    return target;
  } catch {
    return null;
  }
}

async function optimize() {
  await ensureDir(IMG_DIR);
  // Optional CLI arg: --src=relative/or/absolute/path
  const arg = process.argv.find((a) => a.startsWith('--src='));
  let cliSrc = arg ? arg.replace('--src=', '') : null;
  if (cliSrc && !path.isAbsolute(cliSrc)) cliSrc = path.join(ROOT, cliSrc);
  let using = cliSrc;
  if (using) {
    try { await fs.access(using); } catch { using = null; }
  }

  let src = using || (await findSource());
  if (!src) {
    src = await tryCopyFromPublicFallback();
  }
  if (!src) {
    console.log('\n[optimize-hero] Missing source file.');
    console.log('Place your photo at: public/images/hero-bg.jpg');
    console.log('Or pass a path via --src=./public/your-photo.jpg');
    console.log('Then re-run: npm run optimize:hero -- --src=./public/your-photo.jpg\n');
    return;
  }

  const base = path.join(IMG_DIR, 'hero-bg');
  const avifOut = `${base}.avif`;
  const webpOut = `${base}.webp`;
  const jpgOut = `${base}.jpg`; // overwrite as progressive fallback

  // Read once, resize/rotate; limit width for payload control
  const img = sharp(src, { failOnError: false }).rotate();
  const meta = await img.metadata();
  const width = Math.min(meta.width || 2000, 2000);

  // Create AVIF
  await img
    .clone()
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 45, effort: 6 })
    .toFile(avifOut);

  // Create WEBP
  await img
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(webpOut);

  // Progressive JPEG fallback
  await img
    .clone()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true })
    .toFile(jpgOut);

  console.log('\n[optimize-hero] Done:');
  console.log(' -', path.relative(ROOT, avifOut));
  console.log(' -', path.relative(ROOT, webpOut));
  console.log(' -', path.relative(ROOT, jpgOut));
}

optimize().catch((err) => {
  console.error('[optimize-hero] Error:', err);
  process.exit(1);
});
