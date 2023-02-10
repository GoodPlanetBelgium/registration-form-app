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
  RegistrationsStartDate: string
  RegistrationsEndDate: string
}
