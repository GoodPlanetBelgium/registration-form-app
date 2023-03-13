import { Button } from '@mui/material'
import { Field, Form, Formik, FormikProps, useFormik } from 'formik'
import { Initiative } from '../../lib/interfaces'
import useTranslations from '../../lib/useTranslations'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import TextField from '../fields/TextField'
import { FormValues, initialValues, validationSchema } from './schema'

interface FormProps {
  initiative: Initiative
  onSubmit(values: FormValues): Promise<Response>
}

const SignUpForm = ({ onSubmit, initiative }: FormProps) => {
  const t = useTranslations('Form')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(t)}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form>
          <Field
            name='accountId'
            label={t('field.school')}
            component={SalesForceAccountField}
          />
          <Field
            name='applicant.name'
            label={t('field.name')}
            component={TextField}
          />
          <Field
            name='applicant.email'
            label={t('field.email')}
            type='email'
            component={TextField}
          />
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
      )}
    </Formik>
  )
}

export default SignUpForm
