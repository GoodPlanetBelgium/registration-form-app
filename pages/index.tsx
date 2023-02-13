import React from 'react'
import { GetStaticProps, NextPage } from 'next'

import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'

const Home: NextPage = () => {
  const t = useTranslations('Index')
  return (
    <Layout title={t('title')}>
      <p>{t('description')}</p>
    </Layout>
  )
}

Home.getInitialProps = async () => ({})

export default Home
