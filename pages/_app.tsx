import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../helpers/theme'
import createEmotionCache from '../helpers/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { TopBar } from '@/components/TopBar/TopBar'

const clientSideEmotionCache = createEmotionCache()

export type MyAppProps = AppProps & {
  emotionCache: EmotionCache
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <TopBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
