import { Box, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

interface Props {
  label?: string
  children: ReactNode
  error?: boolean
}

const Section: FC<Props> = ({ label, children, error = false }) => (
  <Box sx={{ my: 3, borderBottom: 1, borderColor: 'divider' }}>
    {label && (
      <Typography
        variant='h4'
        sx={{ mb: 1 }}
        color={error ? 'error' : 'text.primary'}
      >
        {label}
      </Typography>
    )}
    {children}
  </Box>
)

export default Section
