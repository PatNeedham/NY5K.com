import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the current ESM module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create assets folder in public if it doesn't exist
const publicAssetsDir = path.join(rootDir, 'public', 'assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy raceMap.png from src/assets to public/assets
const srcImagePath = path.join(rootDir, 'src', 'assets', 'raceMap.png');
const destImagePath = path.join(publicAssetsDir, 'raceMap.png');

try {
  fs.copyFileSync(srcImagePath, destImagePath);
  console.log('✅ Successfully copied raceMap.png to public/assets/');
} catch (err) {
  console.error('❌ Error copying asset file:', err);
  process.exit(1);
}
