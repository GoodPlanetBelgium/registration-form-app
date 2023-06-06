import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@mui/material'
import { FieldProps } from 'formik'
import { FC } from 'react'

interface CheckboxFieldProps {
  label: string
  options?: {
    label: string
    value: string
  }[]
  multiple?: boolean
}

const CheckboxField: FC<CheckboxFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  label
}) => {
  const error = touched[name] && errors[name]
  return (
    <FormGroup sx={{ mr: 2, mb: 1 }}>
      <FormControlLabel
        control={<Checkbox id={name} checked={value} onChange={handleChange} />}
        label={
          <Typography color={Boolean(error) ? 'error' : 'text.primary'}>
            {label}
          </Typography>
        }
      />
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2, mt: 0 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
    </FormGroup>
  )
}

export default CheckboxField
