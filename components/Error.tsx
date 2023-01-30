import { Alert } from '@mui/material'

const Error = (message: any) => (
  <Alert severity='error'>{JSON.stringify(message, null, 2)}</Alert>
)

export default Error
