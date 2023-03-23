import { Box, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

interface Props {
  label: string
  children: ReactNode
}

const Section: FC<Props> = ({ label, children }) => (
  <Box sx={{ p: 2, my: 2, borderBottom: 1, borderColor: 'divider' }}>
    <Typography variant='h4' sx={{ mb: 1 }}>
      {label}
    </Typography>
    {children}
  </Box>
)

export default Section
