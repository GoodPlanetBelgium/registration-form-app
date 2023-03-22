import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { themeOptions } from '../lib/theme'
import '@fontsource/lato/400.css'

function App ({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
