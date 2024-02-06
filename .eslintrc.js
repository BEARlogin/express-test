module.exports = {
  env: {
    node: true, // Define Node.js global variables and Node.js scoping.
    es2021: true, // Specifies the version of ECMAScript syntax you want to use.
  },
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint.
    'plugin:node/recommended', // Use the recommended rules from eslint-plugin-node.
  ],
  parserOptions: {
    ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features.
    sourceType: 'module', // Allows using import/export statements.
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs.
    // Example rules
    indent: ['error', 2], // Enforce 2-space indentation.
    'linebreak-style': ['error', 'unix'], // Enforce Unix linebreaks.
    quotes: ['error', 'single'], // Enforce single quotes.
    semi: ['error', 'always'], // Require semicolons.
    'no-unused-vars': 'warn', // Warn about variables that are declared but not used.
    'node/no-unsupported-features/es-syntax': ['error', { // Prevent using unsupported ES syntax
      version: '>=12.0.0',
      ignores: [],
    }],
  },
};
