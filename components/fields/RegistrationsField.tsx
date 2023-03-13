import { FieldArray } from 'formik'
import { FieldProps } from './fields'
import TextField from './TextField'

const RegistrationsField = ({ formik, name }: FieldProps) => {
  ;<FieldArray
    name={name}
    render={arrayHelpers => (
      <>
        {formik.values[name].map((registration, i) => (
          <div key={i}>
            <TextField
              formik={formik}
              name='Group_Name'
              label='## GROUP NAME'
              type='text'
            />
          </div>
        ))}
      </>
    )}
  />
}

export default RegistrationsField
