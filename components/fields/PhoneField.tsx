import { FieldProps, getIn } from 'formik'
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input'
import { FC } from 'react'

interface PhoneFieldProps {
  label: string
  helperText?: string
  fullWidth?: boolean
}

const PhoneField: FC<PhoneFieldProps & FieldProps> = ({
  field: { name, value },
  form: { setFieldValue, touched, errors },
  label,
  helperText = '',
  fullWidth = true
}) => {
  const error = (getIn(touched, name) && getIn(errors, name)) || ''

  const onChange = (value: string, info: MuiTelInputInfo): void => {
    setFieldValue(name, value)
  }

  return (
    <MuiTelInput
      id={name}
      name={name}
      defaultCountry='BE'
      disableDropdown
      label={label}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || '' + helperText}
      fullWidth={fullWidth}
      sx={{ mr: 2, mb: 2 }}
    />
  )
}

export default PhoneField
