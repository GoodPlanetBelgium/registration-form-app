import { CheckBox } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { FieldArray, FieldProps } from 'formik'
import { FC } from 'react'
import { Account, PickListValues } from '../../lib/interfaces'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'

interface TOEFieldProps {
  account: Account
  label: string
}

const TypeOfEducationField: FC<TOEFieldProps & FieldProps> = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  account
}) => {
  const t = useTranslations('Form')
  const {
    result,
    isLoading
  }: {
    result: { data: PickListValues }
    isLoading: boolean
  } = useFetch(
    `/api/picklist-values?sObject=Account&field=C_Type_of_Education__c`
  )
  if (!result || isLoading) return <CircularProgress />
  const picklist = result.data?.values.filter(({ validFor }) =>
    validFor.includes(result.data.controllerValues[account.GP_Language__c])
  )
  const onChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    if (value.includes(e.target.name)) {
      console.log('removing value')
      const newArr = [...value]
      newArr.splice(newArr.indexOf(e.target.name), 1)
      setFieldValue(name, newArr)
    } else {
      console.log('adding')
      setFieldValue(name, [e.target.name, ...value])
    }
  }

  return (
    <FormControl sx={{ mt: 2 }} component='fieldset' variant='standard'>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup row>
        {picklist.map((option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={onChange}
                name={option.value}
              />
            }
            label={t(`field.schoolEducationType.${option.value}`)}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default TypeOfEducationField
