import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { themeOptions } from '../lib/theme'
import '@fontsource/lato/400.css'
import Head from 'next/head'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href='/goodplanet_logo_blue.png' />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
