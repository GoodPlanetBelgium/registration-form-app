import { Button } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { fieldType } from '../lib/formSchema'
import useTranslations, { TranslationType } from '../lib/useTranslations'
import TextField from './fields/TextField'

interface FormProps {
  fields: (translate: TranslationType) => fieldType[]
}

const Form = ({ fields }: FormProps) => {
  const t = useTranslations('Form')
  const formik = useFormik({
    initialValues: fields(t).reduce(
      (x, obj) => ({ [obj.name]: obj.initialValue }),
      {}
    ),
    validationSchema: Yup.object().shape(
      fields(t).reduce((x, obj) => ({ [obj.name]: obj.validation }), {})
    ),
    onSubmit: values => console.log(values)
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      {fields(t).map(({ type, ...props }, i) => {
        if (type === 'text' || type === 'email') {
          return <TextField key={i} formik={formik} {...props} />
        }
      })}
      <Button color='primary' variant='contained' type='submit'>
        {t('submit')}
      </Button>
    </form>
  )
}

export default Form
