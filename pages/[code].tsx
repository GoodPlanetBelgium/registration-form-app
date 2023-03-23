import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch, { FetchResult } from '../lib/useFetch'
import { Alert, Typography } from '@mui/material'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/form/Form'
import { Initiative, Locale } from '../lib/interfaces'
import getStatus from '../lib/getStatus'
import { FormValues } from '../components/form/schema'

const InitiativePage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const t = useTranslations('Form')

  const {
    result,
    isLoading,
    error
  }: // error
  { result: { data: Initiative }; isLoading: boolean; error?: any } = useFetch(
    code ? `/api/initiative/${code}` : null
  )

  if (!code || isLoading) return <Loading />
  if (error) return <Error message={error.message} />

  const { data: initiative } = result

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
        <>
          <Alert severity='info' icon={false}>
            <div
              dangerouslySetInnerHTML={{
                __html: initiative[
                  `${router.locale?.toUpperCase()}_Info__c` as
                    | 'NL_Info__c'
                    | 'FR_Info__c'
                ].replace('<br>', '')
              }}
            />
          </Alert>
          <Form onSubmit={onSubmit} initiative={initiative} />
        </>
      )}
    </Layout>
  )
}

export default InitiativePage
