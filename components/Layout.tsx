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
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ m: 12 }}>{children}</Box>
  </>
)

export default Layout
