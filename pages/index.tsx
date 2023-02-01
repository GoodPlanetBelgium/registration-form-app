import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/Layout'
import useTranslations from '../lib/translations'

const Home: NextPage = () => {
  const t = useTranslations('Index')
  return (
    <Layout title={t('title')}>
      <p>{t('description')}</p>
    </Layout>
  )
}

export default Home
