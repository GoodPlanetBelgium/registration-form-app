import { Alert, Box, Button } from '@mui/material'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log('Fallback:', JSON.stringify(error))
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Alert severity={'error'}>
        <h1>An error has occurred.</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </Alert>
      <Button
        variant='contained'
        color='error'
        onClick={resetErrorBoundary}
        sx={{ m: 2 }}
      >
        Retry
      </Button>
    </Box>
  )
}
export default ErrorFallback
