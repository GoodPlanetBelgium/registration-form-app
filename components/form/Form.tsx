import { Button, FormHelperText, Paper, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import useTranslations from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import TextField from '../fields/TextField'
import WorkshopField from '../fields/WorkshopField'
import ContactSubForm from './ContactSubForm'
import { initialValues, validationSchema } from './schema'
import SendIcon from '@mui/icons-material/Send'
import Loading from '../Loading'

interface FormProps {
  initiative: SFInitiative

  onSubmit(values: FormValues): Promise<Response>
}

const SignUpForm = ({ onSubmit, initiative }: FormProps) => {
  const t = useTranslations('Form')

  const [countError, setCountError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const beforeSubmit = async (values: FormValues) => {
    let count = 0
    initiative.Workshops__r.records.forEach(
      w => (count = count + values.workshops[w.Id].length)
    )
    if (count > 0) {
      setSubmitting(true)
      await onSubmit(values)
      setSubmitting(false)
    } else {
      setCountError('sub.workshop.field.required')
    }
  }

  return (
    <Formik
      initialValues={initialValues(initiative)}
      validationSchema={validationSchema(t, initiative)}
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
                component={WorkshopField}
              />
            ))}
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
            {countError && (
              <FormHelperText error>{t(countError)}</FormHelperText>
            )}
            {!!Object.keys(errors).length && !!Object.keys(touched).length && (
              <FormHelperText error>{t('errorsFound')}</FormHelperText>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUpForm
