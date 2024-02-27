import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useFetch from '../lib/useFetch'
import { Alert, Box } from '@mui/material'
import va from '@vercel/analytics'

import Loading from '../components/Loading'
import ErrorComponent from '../components/Error'
import Layout from '../components/Layout'
import useTranslations from '../lib/useTranslations'
import Form from '../components/form/Form'
import getStatus from '../lib/getStatus'
import Result from '../components/Result'
import DataGuard from '../components/DataGuard'
import getText from '../lib/getText'
import { useErrorBoundary } from 'react-error-boundary'
import filterWorkshops from '../lib/filterWorkshops'

const InitiativePage: NextPage = () => {
  const {
    query: { code },
    locale
  } = useRouter()
  const t = useTranslations('Form')

  const { showBoundary } = useErrorBoundary()

  const initiativeFetch: {
    result: { data: { initiative: SFInitiative } }
    isLoading: boolean
    error?: any
  } = useFetch(code ? `/api/initiative/${code}` : null)

  const [sfResult, setSFResult] = useState<SFResult | null>(null)

  if (!code || initiativeFetch.isLoading)
    return (
      <Layout title=''>
        <Box
          sx={{
            height: 'calc(100vh - 120px)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loading />
        </Box>
      </Layout>
    )
  if (initiativeFetch.error)
    return <ErrorComponent message={initiativeFetch.error.message} />

  const {
    data: { initiative }
  } = initiativeFetch.result

  const onSubmit = async (values: FormValues): Promise<Response> => {
    va.track('SignUpEvent', { values: JSON.stringify(values) })
    const data: ExtendedFormValues = {
      initiativeId: initiative.Id,
      ...values
    }
    const response = await fetch('/api/initiative/sign-up', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const result = await response.json()
      va.track('SignUpResult', { values: JSON.stringify(result) })
      setSFResult(result)
    } else {
      const error = await response.text()
      va.track('SignUpError', { error: JSON.stringify(error) })
      showBoundary(error)
    }
    return response
  }

  const { status, earliestOpen } = getStatus(initiative)

  const info = getText(locale, 'Info', initiative)

  const filteredInitiative = filterWorkshops(initiative)

  return (
    <DataGuard initiative={filteredInitiative}>
      <Layout
        title={t('title', {
          name: getText(locale, 'Title', filteredInitiative)
        })}
      >
        {status !== 'open' && (
          <Alert severity='warning'>
            {t(`status.${status}`, {
              date: earliestOpen.format('DD-MM-YYYY HH:mm')
            })}
          </Alert>
        )}
        {!!sfResult && <Result {...sfResult} initiative={filteredInitiative} />}
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
            <Form onSubmit={onSubmit} initiative={filteredInitiative} />
          </>
        )}
      </Layout>
    </DataGuard>
  )
}

export default InitiativePage
