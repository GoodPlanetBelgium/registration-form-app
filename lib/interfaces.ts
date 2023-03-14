export type Locale = 'nl' | 'fr'

export type Status = 'unavailable' | 'closed' | 'pending' | 'open'

export interface Account {
  Id: string
  Name: string
  ShippingStreet: string
  ShippingCity: string
  ShippingPostalCode: string
  GP_Account_Type__c: string
}

export interface Workshop {
  Id: string
  Name: string
  C_Registrations_Status__c: Status
  C_Registrations_Start__c: string
  C_Registrations_End__c: string
  C_Required_For_Registration__c: boolean
  NL_Info__c: string
  FR_Info__c: string
}
export interface Initiative {
  Id: string
  Name: string
  C_Registrations_restrict_by_Account_Type__c: string
  C_Registrations_Postcodes__c: string
  C_Registrations_Region__c: 'Flanders' | 'Wallonia' | 'Brussels'
  NL_Info__c: string
  FR_Info__c: string
  Workshops__r: {
    records: Workshop[]
  }
}
