import { Button } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FieldType } from '../lib/formSchema'
import useTranslations, { TranslationType } from '../lib/useTranslations'
import SalesForceAccountField from './fields/SalesForceAccountField'
import TextField from './fields/TextField'

interface FormProps {
  fields: (translate: TranslationType) => FieldType[]
  onSubmit(values: { [key: string]: string }): Promise<Response>
}

const Form = ({ fields, onSubmit }: FormProps) => {
  const t = useTranslations('Form')
  const formik = useFormik({
    initialValues: fields(t).reduce(
      (obj, item) => ({ ...obj, [item.name]: item.initialValue }),
      {}
    ),
    validationSchema: Yup.object().shape(
      fields(t).reduce(
        (obj, item) => ({ ...obj, [item.name]: item.validation }),
        {}
      )
    ),
    onSubmit
  })
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {fields(t).map(({ type, ...props }, i) => {
        const extendedProps = { formik, type, ...props }
        if (type === 'text' || type === 'email') {
          return <TextField key={i} {...extendedProps} />
        }
        if (type === 'account') {
          return <SalesForceAccountField key={i} {...extendedProps} />
        }
      })}
      <Button
        color='primary'
        variant='contained'
        type='submit'
        sx={{ margin: '1rem 0' }}
      >
        {t('submit')}
      </Button>
    </form>
  )
}

export default Form
