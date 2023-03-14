import {
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
import { FieldProps } from 'formik'
import { ChangeEvent, FC, useState } from 'react'
import { Account } from '../../lib/interfaces'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'
import Loading from '../Loading'

interface SFFieldProps {
  label: string
  fullWidth?: boolean
}

const SalesForceAccountField: FC<SFFieldProps & FieldProps> = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  fullWidth = true
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
    data,
    isLoading,
    error: fetchError
  } = useFetch(
    postcode && postcode.length === 4
      ? `/api/schools?postcode=${postcode}`
      : null
  )

  const onChangeAccount = (e: SelectChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value)
    setAccount(data?.records.find(({ Id }: Account) => Id === e.target.value))
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
        {!!data?.records?.length ? (
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Chip sx={{ mx: 2 }} label={`${data.totalSize} gevonden`} />
              <FormControl sx={{ mt: 2 }} fullWidth={fullWidth}>
                <InputLabel id='account-select'>{label}</InputLabel>
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
                      GP_Account_Type__c
                    }: Account) => (
                      <MenuItem value={Id} key={Id}>
                        {Name}, {ShippingStreet} {ShippingPostalCode}{' '}
                        {ShippingCity} - {GP_Account_Type__c}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </>
          )
        ) : null}
        {account ? (
          <Card sx={{ m: 2 }}>
            <CardContent>
              <b>SalesForce ID:</b> {account.Id}
              <br />
              <b>School:</b> {account.Name}
              <br />
              <b>Adres:</b> {account.ShippingStreet}{' '}
              {account.ShippingPostalCode} {account.ShippingCity}
              <br />
              <b>Type:</b> {account.GP_Account_Type__c}
            </CardContent>
          </Card>
        ) : null}
      </Paper>
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
    </>
  )
}

export default SalesForceAccountField
