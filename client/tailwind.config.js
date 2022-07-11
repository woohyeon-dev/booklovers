/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '1024px',
      desktop: '1200px',
      wide: '1536px',
    },
    fontFamily: {
      sans: ['Noto Sans KR', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        lightScheme: {
          primary: '#1E41EB',
          'primary-focus': '#3454ed',
          'primary-content': '#ffffff',
          secondary: '#E8EBF9',
          'secondary-focus': '#d4d9f4',
          'secondary-content': '#1E41EB',
          accent: '#11B679',
          'accent-focus': '#28bd86',
          'accent-content': '#ffffff',
          neutral: '#ECEDEF',
          'neutral-focus': '#dee0e3',
          'neutral-content': '#3e4549',
          'base-100': '#f2f2f2',
          'base-200': '#f7f8f9', // 기본 배경색상
          'base-300': '#FFFFFF',
          'base-content': '#111314', // 타이틀 폰트 색상
          info: '#88929c', // 부가설명 폰트 색상
          success: '#0FA36C',
          warning: '#DB5F6C',
          error: '#DB5F6C',
        },
        gray: {
          100: '#111314', // 타이틀 폰트 색상
          200: '#3e4549', // 본문 폰트 색상
          300: '#737e8a',
          400: '#88929c', // 부가설명 폰트 색상
          500: '#AAB1B8',
          600: '#d5d7db',
          700: '#dee0e3',
          800: '#f7f8f9', // 기본 배경 색상
          900: '#ffffff',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
