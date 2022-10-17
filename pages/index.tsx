import { NextPage } from 'next'
import Head from 'next/head'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SchoolPicker from '../components/SchoolPicker'
import React, { useState } from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>A Salesforce API test case</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar position='absolute' color='default'>
        <Toolbar>
          <Typography variant='h6'>SalesForce API proof of concept</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 12 }}>
        <SchoolPicker />
      </Box>
    </>
  )
}

export default Home
