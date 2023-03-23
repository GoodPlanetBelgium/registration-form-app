import { TextField as Field } from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface TextFieldProps {
  type?: 'text' | 'number'
  label: string
  helperText?: string
  multiline?: boolean
}

const TextField: FC<TextFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  type = 'text',
  label,
  helperText = '',
  multiline = false
}) => {
  const error = (getIn(touched, name) && getIn(errors, name)) || ''
  return (
    <Field
      id={name}
      name={name}
      type={type}
      inputProps={type === 'number' ? { min: 0 } : {}}
      label={label}
      value={value}
      onChange={handleChange}
      error={Boolean(error)}
      helperText={error || '' + helperText}
      sx={{ mr: 2, mb: 2 }}
      multiline={multiline}
      fullWidth={multiline}
    />
  )
}

export default TextField
