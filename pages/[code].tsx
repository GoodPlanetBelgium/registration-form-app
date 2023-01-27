import { NextPage } from 'next'
import Head from 'next/head'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SchoolPicker from '../components/SchoolPicker'
import React from 'react'
import { useRouter } from 'next/router'
import useInitiative from '../lib/useInitiative'

const Form: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const { data: initiative, isLoading, isError } = useInitiative(code)
  console.log(initiative)
  return (
    <>
      <Head>
        <title>{initiative.Name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar position='absolute' color='default'>
        <Toolbar>
          <Typography variant='h6'>{initiative.Name}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 12 }}>
        <SchoolPicker />
      </Box>
    </>
  )
}

export default Form
