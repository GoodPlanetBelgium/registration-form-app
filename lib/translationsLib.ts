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
      title: 'Inschrijvingen: {name}'
    }
  },
  fr: {
    Index: {
      title: "Formulaire d'inscription des projets GoodPlanet.",
      description:
        "Veuillez saisir une URL valide pour accéder au formulaire d'inscription approprié."
    },
    Form: {}
  }
}

export default translations
