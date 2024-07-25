// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt().overrideRules({
  '@typescript-eslint/no-unused-vars': 'warn',
  'vue/html-self-closing': 'off'
});
