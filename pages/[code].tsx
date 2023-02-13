import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch, { FetchResult } from '../lib/useFetch'
import dayjs from 'dayjs'
import { Alert } from '@mui/material'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/Form'
import fields from '../lib/formSchema'
import { Initiative } from '../lib/interfaces'

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

  const onSubmit = async (values: {
    [key: string]: string
  }): Promise<Response> => {
    const result = await fetch('/api/initiative/sign-up', {
      method: 'POST',
      body: JSON.stringify({ initiativeId: initiative.Id, ...values })
    })
    return result
  }

  return (
    <Layout title={t('title', { name: initiative.Name })}>
      {initiative.C_Registrations_Status__c !== 'open' ? (
        <Alert severity='warning'>
          {t(`status.${initiative.C_Registrations_Status__c}`, {
            date: dayjs(initiative.C_Registrations_Start__c).format(
              'DD-MM-YYYY HH:mm'
            )
          })}
        </Alert>
      ) : (
        <Form fields={fields} onSubmit={onSubmit} />
      )}
    </Layout>
  )
}

export default InitiativePage
