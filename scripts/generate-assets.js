import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets/Products and Services');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'products.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files);
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

function generateAssets() {
    if (!fs.existsSync(assetsDir)) {
        console.error(`Assets directory not found: ${assetsDir}`);
        return;
    }

    const allFiles = getFiles(assetsDir);
    const products = [];

    allFiles.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
            const relativePath = path.relative(path.join(__dirname, '../src'), file);
            // Convert Windows backslashes to forward slashes for URL compatibility
            const importPath = relativePath.split(path.sep).join('/');

            const parts = relativePath.split(path.sep);
            // Expected structure: assets/Products and Services/Category/Subcategory/Image.jpg
            // parts[0] = assets
            // parts[1] = Products and Services
            // parts[2] = Category
            // parts[3] = Subcategory (optional)

            // We are scanning inside 'Products and Services', so relative path starts after that?
            // No, path.relative is from 'src'.
            // So relativePath is 'assets/Products and Services/Healthcare/Scrub station/img.jpg'

            const category = parts[2];
            const subcategory = parts.length > 4 ? parts[3] : null;

            products.push({
                id: path.basename(file, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase(),
                name: path.basename(file, ext).replace(/[-_]/g, ' '),
                category: category,
                subcategory: subcategory,
                image: `/src/${importPath}`, // Absolute path for Vite
                importPath: `../${importPath}` // Relative path for dynamic import if needed
            });
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
    console.log(`Generated ${products.length} products in ${outputFile}`);
}

generateAssets();
