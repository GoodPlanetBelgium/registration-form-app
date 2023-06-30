import { Alert, Button, Paper, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import useTranslations from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import TextField from '../fields/TextField'
import WorkshopField from '../fields/WorkshopField'
import ContactSubForm from './ContactSubForm'
import { initialValues, validationSchema } from './schema'
import SendIcon from '@mui/icons-material/Send'
import Loading from '../Loading'
import getText from '../../lib/getText'
import { useRouter } from 'next/router'

interface FormProps {
  initiative: SFInitiative
  questions: SFQuestion[]
  onSubmit(values: FormValues): Promise<Response>
}

const SignUpForm = ({ onSubmit, initiative, questions }: FormProps) => {
  const t = useTranslations('Form')
  const { locale } = useRouter()

  const [countError, setCountError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const beforeSubmit = async (values: FormValues) => {
    let count = 0
    initiative.Workshops__r.records.forEach(
      w => (count = count + values.workshops[w.Id].registrations.length)
    )
    if (count > 0) {
      setSubmitting(true)
      await onSubmit(values)
      setSubmitting(false)
    } else {
      setCountError('sub.workshop.field.required')
    }
  }

  const requirements = getText(locale, 'Requirements', initiative)

  return (
    <Formik
      initialValues={initialValues(initiative, questions)}
      validationSchema={validationSchema(t, initiative, questions)}
      onSubmit={beforeSubmit}
    >
      {({ values, errors, touched }) => {
        // console.log(values, errors)
        return (
          <Form noValidate>
            <Paper sx={{ my: 3 }}>
              <Field
                name='account'
                label={t('field.school')}
                initiative={initiative}
                component={SalesForceAccountField}
              />
            </Paper>
            <Paper sx={{ my: 3 }}>
              <Typography sx={{ py: 1 }} variant='h2'>
                {t('sub.contact.title')}
              </Typography>
              <Typography sx={{ mb: 2 }} color='text.secondary'>
                {t('sub.contact.subtitle')}
              </Typography>
              <ContactSubForm
                nameSpace='applicant'
                fields={[
                  'firstName',
                  'lastName',
                  'email',
                  'phone',
                  'role',
                  'newsLetter'
                ]}
              />
            </Paper>
            {Object.keys(values.workshops).map((workshopId, i) => (
              <Field
                key={i}
                name={`workshops.${workshopId}`}
                initiative={initiative}
                workshopId={workshopId}
                questions={questions.filter(
                  q => q.C_Initiative_Element__c === workshopId
                )}
                component={WorkshopField}
              />
            ))}
            {!!requirements && (
              <Alert severity='info' icon={false} sx={{ my: 3 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: requirements
                  }}
                />
              </Alert>
            )}
            <Field
              name='remark'
              label={t('field.remark')}
              component={TextField}
              multiline
            />
            <Field
              name='agreed'
              label={t('field.agreed')}
              component={CheckboxField}
            />
            <Typography
              variant='body1'
              dangerouslySetInnerHTML={{ __html: t('privacyStatement') }}
            />
            {submitting ? (
              <Loading />
            ) : (
              <Button
                color='primary'
                variant='contained'
                size='large'
                type='submit'
                sx={{ my: 2, width: { xs: '100%', sm: '320px' } }}
              >
                <SendIcon sx={{ mr: 1 }} /> {t('submit')}
              </Button>
            )}
            {countError && <Alert severity='error'>{t(countError)}</Alert>}
            {!!Object.keys(errors).length && !!Object.keys(touched).length && (
              <Alert severity='error'>{t('errorsFound')}</Alert>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUpForm
