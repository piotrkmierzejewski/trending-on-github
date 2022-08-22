import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../helpers/theme'
import createEmotionCache from '../helpers/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import { TopBar } from '@/components/TopBar/TopBar'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <TopBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
