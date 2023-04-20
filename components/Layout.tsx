import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'
import Image from 'next/image'
import logo from '../public/goodplanet_logo_white.svg'
import LanguageSwitch from './LanguageSwitch'

interface LayoutProps {
  title: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <AppBar position='fixed' sx={{ m: 0, p: 0 }}>
      <Container maxWidth='md'>
        <Toolbar
          sx={{
            py: 2,
            justifyContent: 'space-between'
          }}
        >
          <Image src={logo} alt='GoodPlanet logo' width={48} />
          <LanguageSwitch />
        </Toolbar>
      </Container>
    </AppBar>
    <Container maxWidth='md' sx={{ py: 12 }}>
      <Typography variant='h1' sx={{ my: 2 }}>
        {title}
      </Typography>
      {children}
    </Container>
  </>
)

export default Layout
