// This script sets up the default.js and default.d.ts files
// to re-export from the generated Prisma client
// It also compiles the TypeScript files to JavaScript for runtime
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientDir = path.join(__dirname, '../node_modules/.prisma/client');

// Create default.d.ts - TypeScript will resolve .js extensions to .ts files
const defaultDts = `export * from './client.js';
export * from './enums.js';
`;
fs.writeFileSync(path.join(clientDir, 'default.d.ts'), defaultDts);

// Create default.js - CommonJS format to match @prisma/client/default.js
// Simple approach: require without extension and let module resolution handle it
const defaultJs = `// This file re-exports the generated Prisma client
// It's created automatically by the setup-prisma-client script
// Using CommonJS to match @prisma/client/default.js expectations

// Try to require without extension first (works with ts-node or if .js files exist)
// Module resolution will find .ts files if ts-node is registered, or .js files if compiled
let client, enums;

try {
  // Try without extension - module resolution will find the right file
  client = require('./client');
  enums = require('./enums');
} catch (e) {
  // If that fails, the Prisma client hasn't been generated or ts-node isn't configured
  throw new Error('Cannot load Prisma client. Make sure to run: npx prisma generate. Error: ' + e.message);
}

module.exports = {
  ...client,
  ...enums,
};
`;
fs.writeFileSync(path.join(clientDir, 'default.js'), defaultJs);


console.log('✅ Prisma client default files set up successfully');
