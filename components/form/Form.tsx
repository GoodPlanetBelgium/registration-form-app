import { Button } from '@mui/material'
import { FormikProps, useFormik } from 'formik'
import useTranslations from '../../lib/useTranslations'
import SalesForceAccountField from '../fields/SalesForceAccountField'
import TextField from '../fields/TextField'
import { FormValues, initialValues, validationSchema } from './schema'

interface FormProps {
  onSubmit(values: FormValues): Promise<Response>
}

const Form = ({ onSubmit }: FormProps) => {
  const t = useTranslations('Form')
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  })
  console.log(formik.values, formik.errors)
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <SalesForceAccountField
        name='accountId'
        label={t('field.school')}
        formik={formik}
      />
      <TextField
        name='applicant.name'
        label={t('field.name')}
        type='text'
        formik={formik}
      />
      <TextField
        name='applicant.email'
        label={t('field.email')}
        type='email'
        formik={formik}
      />
      <Button
        color='primary'
        variant='contained'
        type='submit'
        sx={{ margin: '1rem 0' }}
        disabled={formik.isValid}
      >
        {t('submit')}
      </Button>
    </form>
  )
}

export default Form
