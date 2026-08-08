import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0B0F14',
        ink: '#11161D',
        paper: '#1A212B',
        amber: {
          400: '#F5B841',
          500: '#F5B841',
        },
        neon: '#4DE1C1',
        alert: '#E4572E',
        fog: '#8FA3B8',
      },
    },
  },
  plugins: [],
};
export default config;
