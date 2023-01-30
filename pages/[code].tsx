import { NextPage } from 'next'
import Head from 'next/head'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SchoolPicker from '../components/SchoolPicker'
import React from 'react'
import { useRouter } from 'next/router'
import useInitiative from '../lib/useInitiative'
import Loading from '../components/Loading'
import Error from '../components/Error'
import useFetch from '../lib/useFetch'

const Form: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const {
    data: initiative,
    isLoading,
    error
  } = useFetch(code ? `/api/initiative/${code}` : null)
  if (!code || isLoading) return <Loading />
  if (error) return <Error message={error.message} />
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
