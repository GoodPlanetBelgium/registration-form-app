import { TextField as Field, StandardTextFieldProps } from '@mui/material'

const TextField = ({
  formik,
  name,
  ...props
}: StandardTextFieldProps & { formik: any }) => (
  <Field
    id={name}
    name={name}
    fullWidth
    {...props}
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
  />
)

export default TextField
