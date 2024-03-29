import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface RadioFieldProps {
  label: string
  options: {
    label: string
    value: string
  }[]
  info?: string
}

const RadioField: FC<RadioFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  label,
  options,
  info
}) => {
  const error = (getIn(touched, name) && getIn(errors, name)) || ''
  return (
    <FormControl>
      <FormLabel>
        <Typography
          variant='h4'
          sx={{ mb: 1 }}
          color={error ? 'error' : 'text.primary'}
        >
          {label}
        </Typography>
      </FormLabel>
      {!!info && (
        <Alert severity='info' sx={{ '& p': { m: 0 } }}>
          <span
            dangerouslySetInnerHTML={{
              __html: info
            }}
          />
        </Alert>
      )}
      <RadioGroup name={name} value={value} onChange={handleChange}>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2, mt: 0 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default RadioField
