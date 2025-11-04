import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directory = join(__dirname, 'src');

function processFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Match all import statements with local paths
    const newContent = content.replace(/from\s+(['"])(.+?)\1/g, (match, quote, importPath) => {
      // Skip if it's a package import (doesn't start with ./ or ../)
      if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
        return match;
      }
      
      // Skip if it's a CSS/SCSS/JSON file
      if (/\.(css|scss|sass|json)$/.test(importPath)) {
        return match;
      }
      
      // Skip if it already has a .js/.jsx/.ts/.tsx extension
      if (/\.(js|jsx|ts|tsx)$/.test(importPath)) {
        return match;
      }
      
      // Add .js extension
      updated = true;
      return `from ${quote}${importPath}.js${quote}`;
    });

    if (updated) {
      writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated imports in ${relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function walkDir(dir) {
  const files = readdirSync(dir);
  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

console.log('Fixing imports...');
walkDir(directory);
console.log('Done fixing imports!');
