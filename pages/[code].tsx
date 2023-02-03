import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch from '../lib/useFetch'
import dayjs from 'dayjs'
import { Alert } from '@mui/material'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/Form'
import fields from '../lib/formSchema'

const Initiative: NextPage = () => {
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
      {initiative.C_Registrations_Status__c !== 'open' ? (
        <Alert severity='warning'>
          {t(`status.${initiative.C_Registrations_Status__c}`, {
            date: dayjs(initiative.C_Registrations_Start__c).format(
              'DD-MM-YYYY HH:mm'
            )
          })}
        </Alert>
      ) : (
        <Form fields={fields} />
      )}
    </Layout>
  )
}

export default Initiative
