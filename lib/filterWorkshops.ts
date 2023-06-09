const filterWorkshops = (
  initiative: SFInitiative,
  status: Status = 'open'
): SFInitiative => ({
  ...initiative,
  Workshops__r: {
    records: initiative.Workshops__r.records.filter(
      w => w.C_Registrations_Status__c === status
    )
  }
})

export default filterWorkshops
