import React from 'react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch from '../lib/useFetch'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import SchoolPicker from '../components/SchoolPicker'
import useTranslations from '../lib/translations'

const Form: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const t = useTranslations('Form')
  const {
    data: initiative,
    isLoading,
    error
  } = useFetch(code ? `/api/initiative/${code}` : null)
  if (!code || isLoading) return <Loading />
  if (error) return <Error message={error.message} />
  return (
    <Layout title={t('title', { name: initiative.Name })}>
      <SchoolPicker />
    </Layout>
  )
}

export default Form
