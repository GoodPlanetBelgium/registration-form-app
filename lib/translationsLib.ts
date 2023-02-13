interface translationsType {
  [key: string]: {
    [key: string]: {
      [key: string]: string
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
      'field.postcode': 'Postcode',
      'field.name': 'Naam',
      'field.email': 'Emailadres',
      submit: 'Verzenden'
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
