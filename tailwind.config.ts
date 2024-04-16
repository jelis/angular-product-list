import type { Config } from 'tailwindcss'

/**
* @import 'tailwindcss/base';
* @import 'tailwindcss/components';
* @import 'tailwindcss/utilities';
*/

export default {
  content: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

