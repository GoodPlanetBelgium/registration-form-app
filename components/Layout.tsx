import Head from 'next/head'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'

type LayoutProps = {
  title: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <AppBar position='absolute' color='default'>
      <Toolbar>
        <Typography variant='h1'>{title}</Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ mt: 10, mx: { xs: 2, sm: 4, md: 8, lg: 16 } }}>{children}</Box>
  </>
)

export default Layout
