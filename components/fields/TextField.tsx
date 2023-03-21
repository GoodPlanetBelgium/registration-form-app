import { TextField as Field } from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface TextFieldProps {
  type?: 'text' | 'number'
  label: string
  multiline?: boolean
}

const TextField: FC<TextFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  type = 'text',
  label,
  multiline = false
}) => (
  <Field
    id={name}
    name={name}
    type={type}
    inputProps={type === 'number' ? { min: 0 } : {}}
    label={label}
    value={value}
    onChange={handleChange}
    error={getIn(touched, name) && Boolean(getIn(errors, name))}
    helperText={getIn(touched, name) && getIn(errors, name)}
    sx={{ m: 1 }}
    multiline={multiline}
    fullWidth={multiline}
  />
)

export default TextField
