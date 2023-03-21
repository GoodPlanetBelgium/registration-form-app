import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'

interface SelectFieldProps {
  label: string
  options: {
    label: string
    value: string
  }[]
}

const SelectField: FC<SelectFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors },
  label,
  options
}) => {
  const error = getIn(touched, name) && getIn(errors, name)
  return (
    <FormControl sx={{ m: 1, minWidth: 245 }}>
      <InputLabel id={`${name}-label`} error={Boolean(error)}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        error={Boolean(error)}
        autoWidth
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SelectField
