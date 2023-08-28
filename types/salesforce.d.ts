type SFId = string

interface SFTextFields {
  NL_Info__c?: string
  FR_Info__c?: string
  NL_Title__c?: string
  FR_Title__c?: string
  NL_Requirements__c?: string
  FR_Requirements__c?: string
}

interface SFAccount {
  Id: SFId
  Name: string
  ShippingStreet: string
  ShippingCity: string
  ShippingPostalCode: string
  C_School_Type__c:
    | 'Nursery_School'
    | 'Primary_School'
    | 'Nursery_And_Primary_School'
    | 'Secondary_School'
    | 'Higher_Education'
    | 'Adult_Education'
    | 'Secondary_School_Specialized'
    | 'Nursery_School_Specialized'
    | 'Primary_School_Specialized'
  C_Type_of_Education__c?:
    | 'A-Stroom'
    | 'B-Stroom'
    | 'General'
    | 'Technical'
    | 'Art'
    | 'Professional'
    | 'Parttime'
    | 'Specialized'
    | 'Non-native_Entrants_Education'
  GP_Language__c?: 'Dutch' | 'French' | 'German' | 'English'
  C_School_Schedule__c?: string
}

interface SFWorkshop extends SFTextFields {
  Id: SFId
  Name: string
  C_Registrations_Status__c: Status
  C_Registrations_Start__c: string
  C_Registrations_End__c: string
  C_Required_For_Registration__c: boolean
  C_Max_Registrations_Per_School__c?: number
  C_Weekday_Preferences__c?: string
  C_Month_Preferences__c?: string
  C_SharePoint_Site_Id__c?: string
  C_SharePoint_List_Id__c?: string
}

interface SFInitiative extends SFTextFields {
  Id: SFId
  Name: string
  C_Registrations_restrict_by_School_Type__c: string | undefined
  C_Registrations_Postcodes__c: string | undefined
  C_Registrations_Region__c: 'Flanders' | 'Wallonia' | 'Brussels' | undefined
  C_Registrations_Ask_for_school_hours__c: boolean
  Workshops__r: {
    records: SFWorkshop[]
  }
}

interface SFQuestionOption extends SFTextFields {
  Id: SFId
  Name: string
  C_Order__c: number
}

interface SFQuestion extends SFTextFields {
  Id: SFId
  Name: string
  C_Type__c: 'number' | 'text' | 'choice'
  C_Required__c: boolean
  C_Multiple__c: boolean
  C_Question_Order__c: number
  C_One_For_All__c: boolean
  C_Initiative_Element__c: SFId
  Question_Options__r: {
    records: SFQuestionOption[]
  }
}

interface SFPickListValues {
  controllerValues: {
    [key: string]: number
  }
  defaultValue: string | number | null
  values: {
    label: string
    validFor: number[]
    value: string
  }[]
}

// interface SFResult {
//   registrations: {
//     SalesForceId: SFId
//     workshopId: SFId
//     monthPreference: string
//     groupSize: number
//     groupName: string
//     groupContact: {
//       SalesforceId: SFId
//       role: string
//       lastName: string
//       firstName: string
//       email: string
//     }
//     dayOfWeekPreference: string[]
//     copyApplicant: boolean
//   }[]
//   errors: string[]
//   applicant: {
//     SalesforceId: SFId
//     role: string
//     phone: string
//     newsLetterDate: string
//     newsLetter: boolean
//     lastName: string
//     firstName: string
//     email: string
//   }
//   account: {
//     Id: SFId
//     schedule: string
//     educationType: string[]
//   }
// }
