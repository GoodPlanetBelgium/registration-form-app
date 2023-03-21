import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { Field, FieldProps } from 'formik'
import { ChangeEvent, FC, useState } from 'react'
import { Account, Initiative } from '../../lib/interfaces'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'
import Loading from '../Loading'
import TypeOfEducationField from './TypeOfEducationField'

interface SFFieldProps {
  label: string
  initiative: Initiative
}

const SalesForceAccountField: FC<SFFieldProps & FieldProps> = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  initiative
}) => {
  const t = useTranslations('Form')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState<Account | null>(null)

  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue(name, '')
    setAccount(null)
    setPostcode(e.target.value.replace(/\D/g, '').substring(0, 4))
  }

  const {
    result,
    isLoading
  }: {
    result: { data: { totalSize: number; records: Account[] } }
    isLoading: boolean
  } = useFetch(
    postcode && postcode.length === 4
      ? `/api/schools?postcode=${postcode}${
          initiative.C_Registrations_restrict_by_School_Type__c
            ? `&schoolType=${initiative.C_Registrations_restrict_by_School_Type__c}`
            : ''
        }`
      : null
  )

  const data = result?.data

  const onChangeAccount = (e: SelectChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value)
    setAccount(
      data.records.find(({ Id }: Account) => Id === e.target.value) || null
    )
  }

  const error = touched[name] && errors[name]

  return (
    <>
      <Paper
        sx={{
          my: 2,
          p: 2,
          borderColor: error ? 'error.main' : 'grey.400'
        }}
      >
        <Typography
          variant='h6'
          color={Boolean(error) ? 'error' : 'text.primary'}
          sx={{ mb: 2 }}
        >
          {label}
        </Typography>
        <TextField
          label={t('field.postcode')}
          onChange={onChangePostcode}
          value={postcode}
          error={Boolean(error)}
        />
        {data ? (
          !!data?.records?.length ? (
            isLoading ? (
              <Loading />
            ) : (
              <>
                <Chip sx={{ mx: 2 }} label={`${data.totalSize} gevonden`} />
                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel id='account-select' error={Boolean(error)}>
                    {label}
                  </InputLabel>
                  <Select
                    labelId='account-select'
                    value={value}
                    label={label}
                    onChange={onChangeAccount}
                    error={Boolean(error)}
                  >
                    {data.records.map(
                      ({
                        Id,
                        Name,
                        ShippingStreet,
                        ShippingPostalCode,
                        ShippingCity,
                        C_School_Type__c
                      }: Account) => (
                        <MenuItem value={Id} key={Id}>
                          {Name}, {ShippingStreet} {ShippingPostalCode}{' '}
                          {ShippingCity} - {C_School_Type__c}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </>
            )
          ) : (
            <Alert sx={{ my: 2 }} severity='warning'>
              {t('field.noAccountRecords')}
            </Alert>
          )
        ) : null}
        {account ? (
          <Card sx={{ m: 2 }}>
            <CardContent>
              <b>{t('field.school')}:</b> {account.Name}
              <br />
              <b>{t('field.address')}:</b> {account.ShippingStreet}{' '}
              {account.ShippingPostalCode} {account.ShippingCity}
              <br />
              <b>{t('field.schoolType')}:</b>{' '}
              {t(`field.schoolTypeList.${account.C_School_Type__c}`)}
              <Box>
                <Field
                  name='educationType'
                  label={t('field.educationType')}
                  account={account}
                  component={TypeOfEducationField}
                />
              </Box>
            </CardContent>
          </Card>
        ) : null}
        {Boolean(error) && (
          <FormHelperText error sx={{ ml: 2 }}>
            {typeof error === 'string' ? error : null}
          </FormHelperText>
        )}
      </Paper>
    </>
  )
}

export default SalesForceAccountField
