import { parsePhoneNumber } from 'libphonenumber-js'
import * as Yup from 'yup'
import { TranslationType } from '../../lib/useTranslations'

const contactSchema = (t: TranslationType) => ({
  firstName: Yup.string().required(t('field.required')),
  lastName: Yup.string().required(t('field.required')),
  role: Yup.string().required(t('field.required')),
  email: Yup.string()
    .email(t('field.invalidEmail'))
    .required(t('field.required'))
})

const registrationsSchema = (
  t: TranslationType,
  id: string,
  initiative: SFInitiative
) => {
  const workshop = initiative.Workshops__r.records.find(
    w => w.Id === id
  ) as SFWorkshop
  return Yup.array()
    .of(
      Yup.object().shape({
        groupName: Yup.string().required(t('field.required')),
        groupSize: Yup.number().required(t('field.required')),
        copyApplicant: Yup.boolean(),
        groupContact: Yup.object().when('copyApplicant', {
          is: false,
          then: Yup.object(contactSchema(t))
        }),
        dayOfWeekPreference: Yup.array().test(
          'is-weekday-pref-required',
          t('field.required'),
          value => !workshop.C_Weekday_Preferences__c || !!value?.length
        ),
        monthPreference: Yup.string().test(
          'is-month-pref-required',
          t('field.required'),
          value => !workshop.C_Month_Preferences__c || !!value
        )
      })
    )
    .min(
      workshop.C_Required_For_Registration__c ? 1 : 0,
      t('sub.workshop.field.workshopRequired')
    )
}

const validationSchema = (t: TranslationType, initiative: SFInitiative) => {
  const workshopIds = initiative.Workshops__r.records.map(w => w.Id)
  return Yup.object({
    account: Yup.object({
      id: Yup.string()
        .required(t('field.required'))
        .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
      // educationType: Yup.array().of(Yup.string()).min(1, t('field.required')),
      schedule: Yup.string()
        .test('is-schedule-required', t('field.required'), value =>
          initiative.C_Registrations_Ask_for_school_hours__c ? !!value : true
        )
        .matches(
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9](\r\n([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9])*$/,
          { message: t('field.invalid'), excludeEmptyString: true }
        )
    }),
    applicant: Yup.object({
      ...contactSchema(t),
      phone: Yup.string()
        .required(t('field.required'))
        .test('phone-test', t('field.invalid'), value => {
          try {
            return parsePhoneNumber(value || '').isValid()
          } catch {
            return false
          }
        })
    }),
    workshops: Yup.object().shape(
      workshopIds.reduce(
        (obj, id) => ({
          ...obj,
          [id]: registrationsSchema(t, id, initiative)
        }),
        {}
      )
    ),
    remark: Yup.string(),
    agreed: Yup.bool().oneOf([true], t('field.required')),
    newsLetter: Yup.bool()
  })
}

const initialValues = (initiative: SFInitiative) => ({
  account: {
    id: '',
    // educationType: [],
    schedule: null
  },
  applicant: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    newsLetter: false
  },
  workshops: initiative.Workshops__r.records.reduce(
    (obj, workshop) => ({
      ...obj,
      [workshop.Id]: []
    }),
    {}
  ),
  remark: '',
  agreed: false
})

const registrationInitialValues = {
  groupName: '',
  groupSize: '',
  copyApplicant: false,
  groupContact: { firstName: '', lastName: '', email: '', role: '' },
  dayOfWeekPreference: [],
  monthPreference: ''
}

export { initialValues, registrationInitialValues, validationSchema }
