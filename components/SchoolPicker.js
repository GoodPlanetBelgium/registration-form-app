import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import useSchools from '../lib/useSchools'
import { Box } from '@mui/system'

const SchoolPicker = () => {
  const [postcode, setPostcode] = useState('')
  const onChangePostcode = e => {
    setPostcode(e.target.value.replace(/\D/g, '').substring(0, 4))
  }

  const [school, setSchool] = useState()

  const { data, loading, isError } = useSchools(postcode)

  const onChangeSchool = e => {
    setSchool(data?.records.find(({ Id }) => Id === e.target.value))
  }

  return (
    <>
      <TextField
        label='Postcode'
        variant='outlined'
        onChange={onChangePostcode}
        value={postcode}
      />
      {!!data?.records.length ? (
        loading ? (
          <CircularProgress />
        ) : (
          <>
            <Chip sx={{ mx: 2 }} label={`${data.totalSize} gevonden`} />
            <FormControl sx={{ my: 2 }} fullWidth>
              <InputLabel id='school-select'>School</InputLabel>
              <Select
                labelId='school-select'
                value={school?.Id || ''}
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
                  }) => (
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
          <b>Adres:</b> {school.ShippingStreet} {school.ShippingPostCode}{' '}
          {school.ShippingCity}
          <br />
          <b>Type:</b> {school.GP_Account_Type__c}
        </Box>
      ) : null}
    </>
  )
}

export default SchoolPicker
