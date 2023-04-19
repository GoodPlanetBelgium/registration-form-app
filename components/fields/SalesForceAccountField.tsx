import {
  Alert,
  Autocomplete,
  Chip,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { FieldProps, getIn } from 'formik'
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import useFetch from '../../lib/useFetch'
import useTranslations from '../../lib/useTranslations'
import Loading from '../Loading'
import SchoolSubform from '../form/SchoolSubform'

interface SFFieldProps {
  label: string
  initiative: SFInitiative
}

const SalesForceAccountField: FC<SFFieldProps & FieldProps> = ({
  field: { name },
  form: { touched, errors, setFieldValue },
  label,
  initiative
}) => {
  const t = useTranslations('Form')
  const schoolTypes = useTranslations('SchoolTypes')
  const [postcode, setPostcode] = useState('')
  const [account, setAccount] = useState<SFAccount | null>(null)
  const [inputError, setInputError] = useState(false)

  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue(name, '')
    setAccount(null)
    setPostcode(e.target.value.replace(/\D/g, '').substring(0, 4))
  }

  const validPostcodes = (initiative.C_Registrations_Postcodes__c || '')
    .replace(/[^\d,*]/g, '')
    .split(',')

  useEffect(() => {
    if (postcode && postcode.length === 4) {
      setInputError(
        !validPostcodes.find(
          (validPostcode: string) =>
            (validPostcode.includes('*') &&
              validPostcode.charAt(0) === postcode.charAt(0)) ||
            validPostcode === postcode
        )
      )
    } else {
      setInputError(false)
    }
  }, [postcode, validPostcodes])

  const {
    result,
    isLoading
  }: {
    result: { data: { totalSize: number; records: SFAccount[] } }
    isLoading: boolean
  } = useFetch(
    postcode && postcode.length === 4 && !inputError
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
    account: SFAccount | null
  ) => {
    setFieldValue(`${name}.id`, account?.Id)
    setFieldValue(`${name}.schedule`, account?.C_School_Schedule__c || '')
    setFieldValue(
      `${name}.educationType`,
      account?.C_Type_of_Education__c || []
    )
    setAccount(account)
  }

  const error =
    (inputError && t('field.postcode.invalid')) ||
    (getIn(touched, name) && getIn(errors, name))

  return (
    <>
      <Typography variant='h2' sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label={t('field.postcode')}
            onChange={onChangePostcode}
            value={postcode}
            error={Boolean(error)}
            autoComplete='off'
            fullWidth
          />
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {!!data?.records?.length && (
            <Chip
              label={t('field.school.numberFound', { n: data.totalSize })}
              color={data.totalSize > 0 ? 'success' : 'warning'}
            />
          )}
        </Grid>
      </Grid>
      {isLoading && <Loading />}
      {!!data &&
        (!!data?.records?.length ? (
          <Autocomplete
            disablePortal
            fullWidth
            sx={{ mt: 2 }}
            options={data.records}
            getOptionLabel={({
              Name,
              ShippingStreet,
              ShippingPostalCode,
              ShippingCity,
              C_School_Type__c
            }) =>
              `${Name}, ${ShippingStreet} ${ShippingPostalCode} ${ShippingCity} - ${schoolTypes(
                C_School_Type__c
              )}`
            }
            onChange={onChangeAccount}
            renderInput={params => <TextField {...params} label={label} />}
          />
        ) : (
          <Alert sx={{ my: 2 }} severity='warning'>
            {t('field.noAccountRecords')}
          </Alert>
        ))}
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {typeof error === 'string' ? error : null}
        </FormHelperText>
      )}
      {!!account && (
        <>
          <Paper variant='outlined' sx={{ p: 2, my: 2 }}>
            <b>{t('field.school')}:</b> {account.Name}
            <br />
            <b>{t('field.address')}:</b> {account.ShippingStreet}{' '}
            {account.ShippingPostalCode} {account.ShippingCity}
            <br />
            <b>{t('field.schoolType')}:</b>{' '}
            {schoolTypes(account.C_School_Type__c)}
          </Paper>
          <SchoolSubform
            nameSpace='account'
            initiative={initiative}
            account={account}
          />
        </>
      )}
      {!!data && (
        <Typography sx={{ my: 2 }}>{t('field.school.notFoundInfo')}</Typography>
      )}
    </>
  )
}

export default SalesForceAccountField
