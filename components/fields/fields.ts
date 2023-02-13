import { FormikProps } from 'formik'
import { FormValues } from '../../lib/formSchema'

interface FieldProps {
  name: string
  label: string
  type: string
  fullWidth?: boolean
  formik: any
}

export type { FieldProps }
