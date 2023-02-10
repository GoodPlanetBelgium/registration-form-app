import { TextField as Field, StandardTextFieldProps } from '@mui/material'

interface TextFieldProps {
  name: string
  label: string
  type: string
  fullWidth?: boolean
  formik: any
}

const TextField = ({
  formik,
  name,
  fullWidth = true,
  ...props
}: TextFieldProps) => (
  <Field
    id={name}
    name={name}
    fullWidth={fullWidth}
    margin='normal'
    {...(({ label, type }) => ({ label, type }))(props)}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
)

export default TextField
