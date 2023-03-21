import { Button, FormHelperText, Paper, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Initiative } from '../../lib/interfaces'
import useTranslations from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import TextField from '../fields/TextField'
import WorkshopField from '../fields/WorkshopField'
import ContactSubForm from './ContactSubForm'
import { FormValues, initialValues, validationSchema } from './schema'

interface FormProps {
  initiative: Initiative
  onSubmit(values: FormValues): Promise<Response>
}

const SignUpForm = ({ onSubmit, initiative }: FormProps) => {
  const t = useTranslations('Form')

  const [countError, setCountError] = useState('')
  const beforeSubmit = (values: FormValues) => {
    let count = 0
    initiative.Workshops__r.records.forEach(
      w => (count = count + values.workshops[w.Id].length)
    )
    if (count > 0) {
      onSubmit(values)
    } else {
      setCountError('sub.workshop.field.required')
      setTimeout(() => setCountError(''), 5000)
    }
  }

  return (
    <Formik
      initialValues={initialValues(initiative)}
      validationSchema={validationSchema(t, initiative)}
      onSubmit={beforeSubmit}
    >
      {({ isValid, values, errors }) => {
        // console.log(values, errors)
        return (
          <Form>
            <Field
              name='accountId'
              label={t('field.school')}
              initiative={initiative}
              component={SalesForceAccountField}
            />
            <Paper sx={{ p: 2 }}>
              <Typography variant='h6'>{t('sub.contact.title')}</Typography>
              <Typography color='text.secondary'>
                {t('sub.contact.subtitle')}
              </Typography>
              <ContactSubForm
                nameSpace='applicant'
                fields={['name', 'email', 'phone']}
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
              name='remarkByApplicant'
              label={t('field.remark')}
              component={TextField}
              multiline
            />
            <Field
              name='agreed'
              label={t('field.agreed')}
              component={CheckboxField}
            />
            <Button
              color='primary'
              variant='contained'
              type='submit'
              sx={{ margin: '1rem 0' }}
              // disabled={!isValid}
            >
              {t('submit')}
            </Button>
            {countError && (
              <FormHelperText error>{t(countError)}</FormHelperText>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUpForm
