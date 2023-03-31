export type Locale = 'nl' | 'fr'

export type Status = 'unavailable' | 'closed' | 'pending' | 'open'

export interface Account {
  Id: string
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
  C_Type_of_Education__c:
    | 'A-Stroom'
    | 'B-Stroom'
    | 'General'
    | 'Technical'
    | 'Art'
    | 'Professional'
    | 'Parttime'
    | 'Specialized'
    | 'Non-native_Entrants_Education'
  GP_Language__c: 'Dutch' | 'French' | 'German' | 'English'
}

export interface Workshop {
  Id: string
  Name: string
  C_Registrations_Status__c: Status
  C_Registrations_Start__c: string
  C_Registrations_End__c: string
  C_Required_For_Registration__c: boolean
  C_Weekday_Preferences__c: string
  NL_Info__c: string
  FR_Info__c: string
}
export interface Initiative {
  Id: string
  Name: string
  C_Registrations_restrict_by_School_Type__c: string | undefined
  C_Registrations_Postcodes__c: string | undefined
  C_Registrations_Region__c: 'Flanders' | 'Wallonia' | 'Brussels' | undefined
  NL_Info__c: string
  FR_Info__c: string
  Workshops__r: {
    records: Workshop[]
  }
}

export interface PickListValues {
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
