import {
  Alert,
  Autocomplete,
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
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  SyntheticEvent,
  useState
} from 'react'
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
  form: { touched, errors, setFieldValue, setFieldTouched },
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

  const onChangeAccount = (
    e: SyntheticEvent<Element>,
    account: Account | null
  ) => {
    setFieldValue(name, account?.Id, true)
    setAccount(account)
  }

  const error = touched[name] && errors[name]

  return (
    <>
      <Typography variant='h2' sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label={t('field.postcode')}
          onChange={onChangePostcode}
          value={postcode}
          error={Boolean(error)}
        />
        {!!data?.records?.length && (
          <Chip
            sx={{ mx: 2 }}
            label={t('field.school.numberFound', { n: data.totalSize })}
          />
        )}
      </Box>
      {data ? (
        !!data?.records?.length ? (
          isLoading ? (
            <Loading />
          ) : (
            <Autocomplete
              disablePortal
              fullWidth
              sx={{ mt: 2 }}
              options={data.records}
              getOptionLabel={({
                Id,
                Name,
                ShippingStreet,
                ShippingPostalCode,
                ShippingCity,
                C_School_Type__c
              }) =>
                `${Name}, ${ShippingStreet} ${ShippingPostalCode} ${ShippingCity} - ${t(
                  `field.schoolTypeList.${C_School_Type__c}`
                )}`
              }
              onChange={onChangeAccount}
              renderInput={params => <TextField {...params} label={label} />}
            />
          )
        ) : (
          <Alert sx={{ my: 2 }} severity='warning'>
            {t('field.noAccountRecords')}
          </Alert>
        )
      ) : null}
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
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
    </>
  )
}

export default SalesForceAccountField
