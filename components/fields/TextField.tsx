import { TextField as Field } from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface TextFieldProps {
  type?: string
  label: string
  fullWidth?: boolean
}

const TextField: FC<TextFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  type = 'text',
  label,
  fullWidth = true
}) => (
  <Field
    id={name}
    name={name}
    fullWidth={fullWidth}
    margin='normal'
    type={type}
    label={label}
    value={value}
    onChange={handleChange}
    error={getIn(touched, name) && Boolean(getIn(errors, name))}
    helperText={getIn(touched, name) && getIn(errors, name)}
  />
)

export default TextField
