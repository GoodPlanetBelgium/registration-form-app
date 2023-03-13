import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch, { FetchResult } from '../lib/useFetch'
import { Alert } from '@mui/material'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/form/Form'
import { Initiative } from '../lib/interfaces'
import getStatus from '../lib/getStatus'
import { FormValues } from '../components/form/schema'

const InitiativePage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const t = useTranslations('Form')
  const {
    data: initiative,
    isLoading,
    error
  }: Omit<FetchResult, 'data'> & { data: Initiative } = useFetch(
    code ? `/api/initiative/${code}` : null
  )
  if (!code || isLoading) return <Loading />
  if (error) return <Error message={error.message} />

  const onSubmit = async (values: FormValues): Promise<Response> => {
    console.log(values)
    const result = await fetch('/api/initiative/sign-up', {
      method: 'POST',
      body: JSON.stringify({ initiativeId: initiative.Id, ...values })
    })
    return result
  }

  const { status, earliestOpen } = getStatus(initiative)

  return (
    <Layout title={t('title', { name: initiative.Name })}>
      {status !== 'open' ? (
        <Alert severity='warning'>
          {t(`status.${status}`, {
            date: earliestOpen.format('DD-MM-YYYY HH:mm')
          })}
        </Alert>
      ) : (
        <Form onSubmit={onSubmit} />
      )}
    </Layout>
  )
}

export default InitiativePage
