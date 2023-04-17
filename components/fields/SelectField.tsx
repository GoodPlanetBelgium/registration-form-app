import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC, useState } from 'react'
import useTranslations from '../../lib/useTranslations'

interface SelectFieldProps {
  label: string
  options: {
    label: string
    value: string
  }[]
  multiple?: boolean
  noPreferenceOption?: boolean
}

const SelectField: FC<SelectFieldProps & FieldProps> = ({
  field: { name, value },
  form: { handleChange, touched, errors, setFieldValue },
  label,
  options,
  multiple = false,
  noPreferenceOption = false
}) => {
  const t = useTranslations('Form')
  const error = getIn(touched, name) && getIn(errors, name)
  const getLabel = (optionValue: string) =>
    options.find(option => option.value === optionValue)?.label
  const [disabled, setDisabled] = useState(false)
  const toggleNoPreference = () => {
    if (value.includes('No_Preference')) {
      setFieldValue(name, [])
      setDisabled(false)
    } else {
      setFieldValue(name, ['No_Preference'])
      setDisabled(true)
    }
  }
  return (
    <FormControl sx={{ mr: 2, mb: 2, width: '100%' }}>
      <InputLabel id={`${name}-label`} error={Boolean(error)}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        multiple={multiple}
        value={value}
        label={label}
        onChange={handleChange}
        error={Boolean(error)}
        renderValue={selected =>
          disabled
            ? t('field.noPreference')
            : typeof selected === 'string'
            ? getLabel(selected)
            : selected.map(getLabel).join(', ')
        }
        autoWidth
        disabled={disabled}
        fullWidth
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {multiple && <Checkbox checked={value.includes(option.value)} />}
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {noPreferenceOption && (
        <FormControlLabel
          control={<Checkbox checked={value.includes('No_Preference')} />}
          label={
            <Typography color={Boolean(error) ? 'error' : 'text.primary'}>
              {t('field.noPreference')}
            </Typography>
          }
          onChange={toggleNoPreference}
        />
      )}
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SelectField
