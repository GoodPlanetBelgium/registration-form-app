import { Field } from 'formik'
import React, { FC, ReactElement } from 'react'
import useTranslations from '../../lib/useTranslations'
import TextField from '../fields/TextField'

type FieldType = 'firstName' | 'lastName' | 'email' | 'phone' | 'role'
interface Props {
  nameSpace: string
  fields: FieldType[]
}

const ContactSubForm = ({ nameSpace, fields }: Props) => {
  const t = useTranslations('Form')

  const FieldComponents: { [key in FieldType]: ReactElement } = {
    firstName: (
      <Field
        name={`${nameSpace}.firstName`}
        label={t('field.firstName')}
        component={TextField}
      />
    ),
    lastName: (
      <Field
        name={`${nameSpace}.lastName`}
        label={t('field.lastName')}
        component={TextField}
      />
    ),
    email: (
      <Field
        name={`${nameSpace}.email`}
        label={t('field.email')}
        type='email'
        component={TextField}
      />
    ),
    phone: (
      <Field
        name={`${nameSpace}.phone`}
        label={t('field.phone')}
        component={TextField}
      />
    ),
    role: <h2>hi2</h2>
  }
  return (
    <>
      {fields.map((field, i) =>
        React.cloneElement(FieldComponents[field], {
          key: i
        })
      )}
    </>
  )
}

export default ContactSubForm
