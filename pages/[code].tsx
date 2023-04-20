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
import DataGuard from '../components/DataGuard'
import getText from '../lib/getText'

const InitiativePage: NextPage = () => {
  const {
    query: { code },
    locale
  } = useRouter()
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
    const registrations: TransformedRegistration[] = []
    Object.keys(values.workshops).forEach(workshopId =>
      values.workshops[workshopId].forEach(registration =>
        registrations.push({
          workshopId,
          ...registration,
          monthPreference: [registration.monthPreference]
        })
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
        const result = await response.json()
        console.log(result)
        setSFResult(result)
      }
      return response
    } catch (error) {
      throw new (Error as any)(error)
    }
  }

  const { status, earliestOpen } = getStatus(initiative)

  const info = getText(locale, 'Info', initiative)

  return (
    <DataGuard initiative={initiative}>
      <Layout
        title={t('title', {
          name: getText(locale, 'Title', initiative)
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
            {!!info && (
              <Alert severity='info' icon={false}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: info
                  }}
                />
              </Alert>
            )}
            <Form onSubmit={onSubmit} initiative={initiative} />
          </>
        )}
      </Layout>
    </DataGuard>
  )
}

export default InitiativePage
