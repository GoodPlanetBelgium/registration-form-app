import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Account } from '../../lib/interfaces'
import useFetch from '../../lib/useFetch'
import Loading from '../Loading'
import { FieldProps } from './fields'

const SalesForceAccountField = ({
  formik,
  name,
  fullWidth = true
}: FieldProps) => {
  const [postcode, setPostcode] = useState('')
  const [school, setSchool] = useState<Account | null>(null)

  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>): void => {
    formik.setFieldValue(name, '')
    setPostcode(e.target.value.replace(/\D/g, '').substring(0, 4))
  }

  const { data, isLoading, error } = useFetch(
    postcode && postcode.length === 4
      ? `/api/schools?postcode=${postcode}`
      : null
  )

  const onChangeSchool = (e: SelectChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e.target.value)
    setSchool(data?.records.find(({ Id }: Account) => Id === e.target.value))
  }

  return (
    <>
      <TextField
        label='Postcode'
        variant='outlined'
        onChange={onChangePostcode}
        value={postcode}
      />
      {!!data?.records?.length ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            <Chip sx={{ mx: 2 }} label={`${data.totalSize} gevonden`} />
            <FormControl sx={{ my: 2 }} fullWidth>
              <InputLabel id='school-select'>School</InputLabel>
              <Select
                labelId='school-select'
                value={formik.values[name]}
                label='School'
                onChange={onChangeSchool}
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
      {school ? (
        <Box>
          <b>SalesForce ID:</b> {school.Id}
          <br />
          <b>School:</b> {school.Name}
          <br />
          <b>Adres:</b> {school.ShippingStreet} {school.ShippingPostalCode}{' '}
          {school.ShippingCity}
          <br />
          <b>Type:</b> {school.GP_Account_Type__c}
        </Box>
      ) : null}
    </>
  )
}

export default SalesForceAccountField
