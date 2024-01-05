module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    // 'airbnb',
    // 'airbnb-typescript',
    // 'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17 버전 이후 Import React from 'react' 없이도 코드 작성 가능
    'no-use-before-define': 'off', // emotion css를 컴포넌트 파일 하단에서 관리하므로 off
    '@typescript-eslint/no-use-before-define': 'off', // emotion css를 컴포넌트 파일 하단에서 관리하므로 off
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }], // arrow-function 허용
  },
};
