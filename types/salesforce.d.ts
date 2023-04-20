interface SFAccount {
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

interface SFWorkshop {
  Id: string
  Name: string
  C_Registrations_Status__c: Status
  C_Registrations_Start__c: string
  C_Registrations_End__c: string
  C_Required_For_Registration__c: boolean
  C_Weekday_Preferences__c?: string
  C_Month_Preferences__c?: string
  NL_Info__c?: string
  FR_Info__c?: string
  NL_Title__c?: string
  FR_Title__c?: string
}

interface SFInitiative {
  Id: string
  Name: string
  C_Registrations_restrict_by_School_Type__c: string | undefined
  C_Registrations_Postcodes__c: string | undefined
  C_Registrations_Region__c: 'Flanders' | 'Wallonia' | 'Brussels' | undefined
  C_Registrations_Ask_for_school_hours__c: boolean
  NL_Info__c?: string
  FR_Info__c?: string
  NL_Title__c?: string
  FR_Title__c?: string
  Workshops__r: {
    records: SFWorkshop[]
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
