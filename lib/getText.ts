type Text =
  | 'NL_Info__c'
  | 'FR_Info__c'
  | 'NL_Title__c'
  | 'FR_Title__c'
  | 'NL_Requirements__c'
  | 'FR_Requirements__c'

const getText = (
  lang: string | undefined,
  type: 'Title' | 'Info' | 'Requirements',
  obj: SFInitiative | SFWorkshop
) => obj[`${lang?.toUpperCase()}_${type}__c` as Text]?.replace('<br>', '') || ''

export default getText
