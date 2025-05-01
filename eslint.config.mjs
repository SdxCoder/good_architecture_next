import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundriesPlugin from "eslint-plugin-boundaries";
import unusedImportPlugin from "eslint-plugin-unused-imports";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      'boundaries': boundriesPlugin,
      'unused-imports': unusedImportPlugin,
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
    },
    settings: {
      'boundaries/include': [
        "src/**"
      ],
      'boundaries/elements': [
        { mode: 'full', type: 'app', pattern: 'src/app/**' },
        { mode: 'full', type: 'shared', pattern: 'src/shared/**' },
        { mode: 'full', type: 'domain', pattern: 'src/domains/**' }
      ],
    },
    rules: {
      // Unused imports
      'unused-imports/no-unused-imports': 'warn',
      // Consistent imports
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
      "boundaries/no-unknown": [
        "error"
      ],
      "boundaries/no-unknown-files": [
        "error"
      ],
      // Domain boundary rules
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'app', allow: ['shared', 'domain'] },
          { from: 'domain', allow: ['shared', 'domain'] },
          { from: 'shared', allow: ['shared'] },
          { from: 'app', allow: ['app'] },
        ],
      }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/consistent-type-imports': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  }
];

export default config;
