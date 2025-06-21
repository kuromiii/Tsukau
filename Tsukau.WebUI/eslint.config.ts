import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  ignores: [
    'webapp/',
    'node_modules/',
    'install.ts',
  ],
  rules: {
    'no-console': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
})
