interface translationsType {
  [locale: string]: {
    [category: string]: {
      [id: string]: string
    }
  }
}

const translations: translationsType = {
  nl: {
    Index: {
      title: 'GoodPlanet inschrijvingsformulier voor projecten.',
      description:
        'Gelieve een geldige URL in te geven om naar het juiste inschrijvingsformulier te gaan.'
    },
    Form: {
      title: 'Inschrijvingen: {name}',
      'status.pending':
        'Inschrijven voor dit project is pas mogelijk vanaf {date}.',
      'status.closed': 'Inschrijven voor dit project is niet meer mogelijk.',
      'status.unavailable':
        'Inschrijven voor dit project is niet mogelijk of de startdatum is nog niet ingesteld.',
      'field.required': 'Verplicht veld.',
      'field.invalid': 'Dit is geen geldige waarde',
      'field.invalidEmail': 'Dit is geen geldig emailadres',
      'field.school': 'School',
      'field.schoolType': 'Onderwijsniveau',
      'field.schoolTypeList.Nursery_School': 'Kleuteronderwijs',
      'field.schoolTypeList.Primary_School': 'Lageronderwijs',
      'field.schoolTypeList.Nursery_And_Primary School':
        'Kleuter- en lageronderwijs',
      'field.schoolTypeList.Secondary_School': 'Middelbaaronderwijs',
      'field.schoolTypeList.Higher_Education': 'Hogeronderwijs',
      'field.schoolTypeList.Adult_Education': 'Volwassenenonderwijs',
      'field.educationType': 'Onderwijsvorm',
      'field.schoolEducationType.A-Stroom': 'A-Stroom',
      'field.schoolEducationType.B-Stroom': 'B-Stroom',
      'field.schoolEducationType.General': 'ASO',
      'field.schoolEducationType.Technical': 'TSO',
      'field.schoolEducationType.Art': 'KSO',
      'field.schoolEducationType.Professional': 'BSO',
      'field.schoolEducationType.Parttime': 'Parttime',
      'field.schoolEducationType.Specialized': 'Bijzonder onderwijs',
      'field.address': 'Adres',
      'field.noAccountRecords':
        'Met deze postcode werden er geen scholen gevonden die voldoen aan de voorwaarden voor dit project.',
      'field.postcode': 'Postcode',
      'field.firstName': 'Voornaam',
      'field.lastName': 'Achternaam',
      'field.email': 'Emailadres',
      'field.phone': 'Telefoonnummer',
      'field.role': 'Functie',
      'sub.contact.title': 'Aanvrager',
      'sub.contact.subtitle':
        'De contactpersoon. Dit kan de leerkracht zijn van één van de aanvragende klassen, een coördinator of directie.',
      'sub.workshop.remove': 'Verwijderen',
      'sub.workshop.add': 'Inschrijving toevoegen',
      'sub.workshop.field.groupName': 'Klas naam',
      'sub.workshop.field.groupSize': 'Aantal leerlingen',
      'sub.workshop.field.copyApplicant':
        'Leerkracht is dezelfde persoon als de aanvrager.',
      'sub.workshop.field.dayOfWeekPreference': 'Voorkeursdag',
      'sub.workshop.field.monthPreference': 'Voorkeursmaand',
      'sub.workshop.field.workshopRequired':
        'Minimum één inschrijving vereist voor deze workshop.',
      'sub.workshop.field.required':
        'Minimum één inschrijving in totaal vereist.',
      'field.remark': 'Opmerking bij de inschrijving',
      'field.agreed':
        'Ik verklaar aan alle voorwaarden te voldoen om de inschrijvingen te kunnen voltooien.',
      submit: 'Verzenden'
    },
    Days: {
      monday: 'maandag',
      tuesday: 'dinsdag',
      wednesday: 'woensdag',
      thursday: 'donderdag',
      friday: 'vrijdag'
    },
    Months: {
      september: 'september',
      october: 'oktober',
      november: 'november',
      december: 'december',
      january: 'januari',
      february: 'februari',
      march: 'maart',
      april: 'april',
      may: 'mei',
      june: 'juni'
    }
  },
  fr: {
    Index: {
      title: "Formulaire d'inscription de GoodPlanet pour les projets.",
      description:
        "Veuillez entrer une URL valide pour accéder au formulaire d'inscription approprié."
    },
    Form: {
      title: 'Inscriptions: {name}',
      'status.pending':
        "L'inscription à ce projet n'est possible qu'à partir de {date}.",
      'status.closed': "L'inscription à ce projet n'est plus possible.",
      'status.unavailable':
        "L'inscription à ce projet n'est pas possible ou la date de début n'a pas encore été définie.",
      'field.required': 'Champ obligatoire.',
      'field.invalid': "Ce n'est pas une valeur valide.",
      'field.invalidEmail': "Ce n'est pas une adresse email valide.",
      'field.school': 'École',
      'field.postcode': 'Code postal',
      'field.name': 'Nom',
      'field.email': 'Adresse email',
      submit: 'Soumettre'
    }
  }
}

export default translations
