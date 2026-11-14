import { statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

// Full-resolution map downloads live in public/maps/full/. Given a file name there, returns its address and a
// label such as "JPG, 4200 × 2550 px, 5.2 MB", read from the file at build time so it never goes stale.
export async function fullRes(file: string) {
  const path = join(process.cwd(), 'public', 'maps', 'full', file);
  const bytes = statSync(path).size; // fails the build if the file is missing
  const { width, height } = await sharp(path).metadata();
  const ext = file.split('.').pop()!.toUpperCase().replace('JPEG', 'JPG');
  const mb = bytes / 1e6;
  const size = mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
  const px = width && height ? `${width} × ${height} px, ` : '';
  return { href: `/maps/full/${file}`, label: `${ext}, ${px}${size}` };
}
