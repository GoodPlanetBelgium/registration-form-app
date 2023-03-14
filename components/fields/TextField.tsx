import { TextField as Field } from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface TextFieldProps {
  type?: string
  label: string
}

const TextField: FC<TextFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  type = 'text',
  label
}) => (
  <Field
    id={name}
    name={name}
    margin='normal'
    type={type}
    label={label}
    value={value}
    onChange={handleChange}
    error={getIn(touched, name) && Boolean(getIn(errors, name))}
    helperText={getIn(touched, name) && getIn(errors, name)}
    sx={{ mx: 1 }}
  />
)

export default TextField
