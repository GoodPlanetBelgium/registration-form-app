import { TextField as Field } from '@mui/material'
import { FieldProps } from './fields'

const TextField = ({
  formik,
  name,
  fullWidth = true,
  ...props
}: FieldProps) => (
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
