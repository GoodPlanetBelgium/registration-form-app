import { FormikProps } from 'formik'

interface FieldProps {
  name: string
  label: string
  type: string
  fullWidth?: boolean
  formik: FormikProps<{}>
}

export type { FieldProps }
