import { TextField as Field } from '@mui/material'
import { getIn } from 'formik'
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
    value={getIn(formik.values, name)}
    onChange={formik.handleChange}
    error={getIn(formik.touched, name) && Boolean(getIn(formik.errors, name))}
    helperText={getIn(formik.touched, name) && getIn(formik.errors, name)}
  />
)

export default TextField
