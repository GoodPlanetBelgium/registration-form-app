import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { themeOptions } from '../lib/theme'
import '@fontsource/lato/400.css'
import Head from 'next/head'

function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href='/goodplanet_logo_blue.png' />
      </Head>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
