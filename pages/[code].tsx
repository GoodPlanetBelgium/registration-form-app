import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch from '../lib/useFetch'
import { Alert } from '@mui/material'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/form/Form'
import getStatus from '../lib/getStatus'
import Result from '../components/Result'

const InitiativePage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const t = useTranslations('Form')

  const initiativeFetch: {
    result: { data: SFInitiative }
    isLoading: boolean
    error?: any
  } = useFetch(code ? `/api/initiative/${code}` : null)

  const [sfResult, setSFResult] = useState<SFResult | null>(null)

  if (!code || initiativeFetch.isLoading) return <Loading />
  if (initiativeFetch.error)
    return <Error message={initiativeFetch.error.message} />

  const { data: initiative } = initiativeFetch.result

  const onSubmit = async (values: FormValues): Promise<Response> => {
    const registrations: (FormRegistration & { workshopId: string })[] = []
    Object.keys(values.workshops).forEach(workshopId =>
      values.workshops[workshopId].forEach(registration =>
        registrations.push({ workshopId, ...registration })
      )
    )
    const { workshops, ...restValues } = values
    const data: FormResult = {
      initiativeId: initiative.Id,
      ...restValues,
      registrations
    }

    try {
      const response = await fetch('/api/initiative/sign-up', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setSFResult(await response.json())
      }
      return response
    } catch (error) {
      throw new (Error as any)(error)
    }
  }

  const { status, earliestOpen } = getStatus(initiative)

  return (
    <Layout
      title={t('title', {
        name: initiative[
          `${router.locale?.toUpperCase()}_Title__c` as
            | 'NL_Info__c'
            | 'FR_Info__c'
        ]
      })}
    >
      {status !== 'open' && (
        <Alert severity='warning'>
          {t(`status.${status}`, {
            date: earliestOpen.format('DD-MM-YYYY HH:mm')
          })}
        </Alert>
      )}
      {!!sfResult && <Result {...sfResult} initiative={initiative} />}
      {!sfResult && status === 'open' && (
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
