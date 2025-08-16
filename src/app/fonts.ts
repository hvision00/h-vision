import localFont from 'next/font/local'

export const telegraf = localFont({
  src: [
    { path: '../../public/fonts/telegraf/Telegraf-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/telegraf/Telegraf-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/telegraf/Telegraf-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-telegraf',
  display: 'swap',
})

export const poppins = localFont({
  src: [
    { path: '../../public/fonts/poppins/Poppins-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/poppins/Poppins-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/poppins/Poppins-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
})