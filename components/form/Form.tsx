import { Button, Paper, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { Initiative } from '../../lib/interfaces'
import useTranslations from '../../lib/useTranslations'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import WorkshopField from '../fields/WorkshopField'
import ContactSubForm from './ContactSubForm'
import { FormValues, initialValues, validationSchema } from './schema'

interface FormProps {
  initiative: Initiative
  onSubmit(values: FormValues): Promise<Response>
}

const SignUpForm = ({ onSubmit, initiative }: FormProps) => {
  const t = useTranslations('Form')

  return (
    <Formik
      initialValues={initialValues(initiative)}
      validationSchema={validationSchema(t, initiative)}
      onSubmit={onSubmit}
    >
      {({ isValid, values, errors }) => {
        console.log(values, errors)
        return (
          <Form>
            <Field
              name='accountId'
              label={t('field.school')}
              component={SalesForceAccountField}
            />
            <Paper sx={{ p: 2 }}>
              <Typography variant='h6'>{t('sub.contact.title')}</Typography>
              <Typography color='text.secondary'>
                {t('sub.contact.subtitle')}
              </Typography>
              <ContactSubForm nameSpace='applicant' />
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
            <Button
              color='primary'
              variant='contained'
              type='submit'
              sx={{ margin: '1rem 0' }}
              disabled={!isValid}
            >
              {t('submit')}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUpForm
