export interface Account {
  Id: string
  Name: string
  ShippingStreet: string
  ShippingCity: string
  ShippingPostalCode: string
  GP_Account_Type__c: string
}

export interface Initiative {
  Id: string
  Name: string
  Code: string
  C_Registrations_Status__c: 'unavailable' | 'closed' | 'pending' | 'open'
  C_Registrations_Start__c: string
  C_Registrations_End__c: string
}
