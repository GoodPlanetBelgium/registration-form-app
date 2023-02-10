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
      (obj, item) => ({ ...obj, [item.name]: item.initialValue }),
      {}
    ),
    validationSchema: Yup.object().shape(
      fields(t).reduce(
        (obj, item) => ({ ...obj, [item.name]: item.validation }),
        {}
      )
    ),
    onSubmit: values => console.log(values)
  })
  console.log(formik.values)
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {fields(t).map((props, i) => {
        if (props.type === 'text' || props.type === 'email') {
          return <TextField key={i} formik={formik} {...props} />
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
