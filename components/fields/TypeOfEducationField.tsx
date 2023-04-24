import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { FC } from 'react'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'
import Section from '../Section'

interface TOEFieldProps {
  account: SFAccount
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
    result: { data: SFPickListValues }
    isLoading: boolean
  } = useFetch(
    `/api/picklist-values?sObject=Account&field=C_Type_of_Education__c`
  )
  if (!result || isLoading) return <CircularProgress />

  const picklist = result.data?.values.filter(({ validFor }) =>
    account.GP_Language__c
      ? validFor.includes(result.data.controllerValues[account.GP_Language__c])
      : false
  )
  const onChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    if (value.includes(e.target.name)) {
      const newArr = [...value]
      newArr.splice(newArr.indexOf(e.target.name), 1)
      setFieldValue(name, newArr)
    } else {
      setFieldValue(name, [e.target.name, ...value])
    }
  }

  const error = getIn(touched, name) && getIn(errors, name)

  return (
    <Section label={label} error={Boolean(error)}>
      <FormControl
        component='fieldset'
        variant='standard'
        error={Boolean(error)}
      >
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
              label={
                <Typography color={Boolean(error) ? 'error' : 'text.primary'}>
                  {t(`field.schoolEducationType.${option.value}`)}
                </Typography>
              }
            />
          ))}
        </FormGroup>
        {Boolean(error) && (
          <FormHelperText error>
            {typeof error === 'string' ? error : null}
          </FormHelperText>
        )}
      </FormControl>
    </Section>
  )
}

export default TypeOfEducationField
