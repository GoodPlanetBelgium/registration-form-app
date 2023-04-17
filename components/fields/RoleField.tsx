import { CircularProgress } from '@mui/material'
import { Field, FieldProps } from 'formik'
import { FC } from 'react'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'
import SelectField from './SelectField'

interface RoleFieldProps {
  label: string
}

const RoleField: FC<RoleFieldProps & FieldProps> = ({
  field: { name },
  label
}) => {
  const t = useTranslations('Form')
  const {
    result,
    isLoading
  }: {
    result: { data: SFPickListValues }
    isLoading: boolean
  } = useFetch(`/api/picklist-values?sObject=Contact&field=GP_Level__c`)

  if (!result || isLoading) return <CircularProgress />

  const picklist = result.data?.values

  return (
    <Field
      name={name}
      label={label}
      component={SelectField}
      options={picklist.map(({ value }) => ({
        label: t(`field.role.${value}`),
        value
      }))}
    />
  )
}

export default RoleField
