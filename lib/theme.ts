import { ThemeOptions } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1895ce'
    },
    secondary: {
      main: '#e72d52'
    },
    error: {
      main: '#e8880a'
    },
    warning: {
      main: '#e8880a'
    },
    info: {
      main: '#afca15'
    },
    text: {
      primary: '#473f30'
    }
  },
  typography: {
    fontFamily: 'Lato',
    h1: {
      fontSize: '2rem'
    },
    h2: {
      fontSize: '1.8rem'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 300
    },
    h4: {
      fontSize: '1.2rem'
    }
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem'
        }
      }
    }
  }
}
