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
      'field.school.numberFound': '{n} scholen gevonden',
      'field.school.notFoundInfo':
        'Vind je jouw school niet in de lijst? Stuur een mailtje naar ict@goodplanet.be',
      'field.schoolType': 'Onderwijsniveau',
      'field.schoolTypeList.Nursery_School': 'Kleuter onderwijs',
      'field.schoolTypeList.Primary_School': 'Lager onderwijs',
      'field.schoolTypeList.Nursery_And_Primary School':
        'Kleuter- en lageronderwijs',
      'field.schoolTypeList.Secondary_School': 'Secundair onderwijs',
      'field.schoolTypeList.Higher_Education': 'Hoger onderwijs',
      'field.schoolTypeList.Adult_Education': 'Volwassenen onderwijs',
      'field.educationType':
        'Welke onderwijsvormen worden aangeboden in deze school?',
      'field.schoolEducationType.A-Stroom': 'A-Stroom',
      'field.schoolEducationType.B-Stroom': 'B-Stroom',
      'field.schoolEducationType.General': 'ASO',
      'field.schoolEducationType.Technical': 'TSO',
      'field.schoolEducationType.Art': 'KSO',
      'field.schoolEducationType.Professional': 'BSO',
      'field.schoolEducationType.Parttime': 'DBSO',
      'field.schoolEducationType.Specialized': 'Bijzonder onderwijs',
      'field.schoolEducationType.Non-native_Entrants_Education': 'OKAN',
      'field.address': 'Adres',
      'field.noAccountRecords':
        'Met deze postcode werden er geen scholen gevonden die voldoen aan de voorwaarden voor dit project.',
      'field.postcode': 'Postcode',
      'field.postcode.invalid':
        'Dit project is niet beschikbaar voor deze postcode.',
      'field.firstName': 'Voornaam',
      'field.lastName': 'Achternaam',
      'field.email': 'Emailadres',
      'field.phone': 'Telefoonnummer',
      'field.role': 'Functie',
      'field.role.Headmaster': 'Directeur',
      'field.role.Teacher': 'Leerkracht',
      'field.role.Maintenance': 'Onderhoudsmedewerker',
      'field.role.Administration': 'Secretariaat',
      'field.role.Vice_Headmaster': 'Onderdirecteur',
      'field.role.Coordinator': 'Coördinator',
      'field.role.Other': 'Anders',
      'field.newsLetter':
        'Ik ontvang graag de nieuwsbrief van GoodPlanet om op te hoogte te zijn van het actuele aanbod',
      'sub.contact.title': 'Aanvrager',
      'sub.contact.subtitle':
        'De contactpersoon. Dit kan de leerkracht zijn van één van de aanvragende klassen, een coördinator, directie, ...',
      'sub.workshop.registrationsTitle': 'Inschrijvingen',
      'sub.workshop.remove': 'Verwijderen',
      'sub.workshop.add': 'Inschrijving toevoegen',
      'sub.workshop.groupTitle': 'Klas',
      'sub.workshop.field.groupName': 'Klas naam',
      'sub.workshop.field.groupSize': 'Aantal leerlingen',
      'sub.workshop.contactTitle': 'Leerkracht of contactpersoon voor de klas',
      'sub.workshop.field.copyApplicant':
        'Leerkracht is dezelfde persoon als de aanvrager.',
      'sub.workshop.field.dayOfWeekPreference': 'Voorkeursdag(en)',
      'sub.workshop.preferencesTitle': 'Voorkeuren',
      'sub.workshop.field.monthPreference': 'Voorkeursmaand',
      'sub.workshop.field.workshopRequired':
        'Minimum één inschrijving vereist voor deze workshop.',
      'sub.workshop.field.required':
        'Minimum één inschrijving in totaal vereist.',
      'field.noPreference': 'Geen voorkeur',
      'field.remark': 'Opmerking bij de inschrijving',
      'field.agreed':
        'Ik verklaar alle informatie rond deze inschrijvingen te hebben gelezen en begrepen.',
      submit: 'Verzenden'
    },
    Days: {
      Monday: 'maandag',
      Tuesday: 'dinsdag',
      Wednesday: 'woensdag',
      Thursday: 'donderdag',
      Friday: 'vrijdag',
      Saturday: 'zaterdag',
      Sunday: 'zondag'
    },
    Months: {
      august: 'augustus',
      september: 'september',
      october: 'oktober',
      november: 'november',
      december: 'december',
      january: 'januari',
      february: 'februari',
      march: 'maart',
      april: 'april',
      may: 'mei',
      june: 'juni',
      july: 'juli'
    }
  },
  fr: {
    Index: {
      title: "Formulaire d'inscription GoodPlanet pour les projets.",
      description:
        "Veuillez entrer une URL valide pour accéder au bon formulaire d'inscription."
    },
    Form: {
      title: 'Inscriptions : {name}',
      'status.pending':
        "L'inscription à ce projet ne sera possible qu'à partir du {date}.",
      'status.closed': "L'inscription à ce projet n'est plus possible.",
      'status.unavailable':
        "L'inscription à ce projet n'est pas possible ou la date de début n'a pas encore été fixée.",
      'field.required': 'Champ obligatoire.',
      'field.invalid': "Cette valeur n'est pas valide.",
      'field.invalidEmail': "Cette adresse e-mail n'est pas valide.",
      'field.school': 'École',
      'field.school.numberFound': '{n} écoles trouvées',
      'field.school.notFoundInfo':
        'Vous ne trouvez pas votre école dans la liste ? Envoyez un email à ict@goodplanet.be',
      'field.schoolType': "Niveau d'enseignement",
      'field.schoolTypeList.Nursery_School': 'Enseignement maternel',
      'field.schoolTypeList.Primary_School': 'Enseignement primaire',
      'field.schoolTypeList.Nursery_And_Primary School':
        'Enseignement maternel et primaire',
      'field.schoolTypeList.Secondary_School': 'Enseignement secondaire',
      'field.schoolTypeList.Higher_Education': 'Enseignement supérieur',
      'field.schoolTypeList.Adult_Education': 'Formation pour adultes',
      'field.educationType':
        "Quels types d'enseignement sont proposés dans cette école?",
      'field.schoolEducationType.A-Stroom': '',
      'field.schoolEducationType.B-Stroom': '',
      'field.schoolEducationType.General': 'Enseignement général',
      'field.schoolEducationType.Technical': 'Enseignement technique',
      'field.schoolEducationType.Art': ' Enseignement artistique',
      'field.schoolEducationType.Professional': 'Enseignement professionnel',
      'field.schoolEducationType.Parttime': 'CEFA',
      'field.schoolEducationType.Specialized': 'Enseignement spécialisé',
      'field.schoolEducationType.Non-native_Entrants_Education': 'DASPA',
      'field.address': 'Adresse',
      'field.noAccountRecords':
        "Aucune école répondant aux critères de ce projet n'a été trouvée avec ce code postal.",
      'field.postcode': 'Code postal',
      'field.postcode.invalid':
        "Ce projet n'est pas disponible pour ce code postal.",
      'field.firstName': 'Prénom',
      'field.lastName': 'Nom de famille',
      'field.email': 'Adresse e-mail',
      'field.phone': 'Numéro de téléphone',
      'field.role': 'Fonction',
      'field.role.Headmaster': 'Directeur',
      'field.role.Teacher': 'Enseignant',
      'field.role.Maintenance': "Agent d'entretien",
      'field.role.Administration': 'Administration',
      'field.role.Vice_Headmaster': 'Sous-directeur',
      'field.role.Coordinator': 'Coordinateur',
      'field.role.Other': 'Autre',
      'field.newsLetter':
        "Je souhaite recevoir la newsletter GoodPlanet pour être informé de l'offre actuelle.",
      'sub.contact.title': 'Demandeur',
      'sub.contact.subtitle':
        'Personne de contact. La personne peut être un enseignant, un coordinateur, un membre de la direction, ...',
      'sub.workshop.registrationsTitle': 'Inscriptions',
      'sub.workshop.remove': 'Supprimer',
      'sub.workshop.add': 'Ajouter une inscription',
      'sub.workshop.groupTitle': 'Classe',
      'sub.workshop.field.groupName': 'Nom de la classe',
      'sub.workshop.field.groupSize': "Nombre d'élèves",
      'sub.workshop.contactTitle':
        'Enseignant ou personne à contacter pour cette classe',
      'sub.workshop.field.copyApplicant':
        "L'enseignant est la même personne que le demandeur.",
      'sub.workshop.field.dayOfWeekPreference': 'Jour de préférence',
      'sub.workshop.preferencesTitle': 'Préférences',
      'sub.workshop.field.monthPreference': 'Mois de préférence',
      'sub.workshop.field.workshopRequired':
        'Au moins une inscription est requise pour cet atelier.',
      'sub.workshop.field.required': 'Au moins une inscription est requise.',
      'field.noPreference': 'Pas de préférence',
      'field.remark': "Remarque pour l'inscription",
      'field.agreed':
        'Je déclare avoir lu et compris toutes les informations concernant ces inscriptions.',
      submit: 'Envoyer'
    },
    Days: {
      Monday: 'lundi',
      Tuesday: 'mardi',
      Wednesday: 'mercredi',
      Thursday: 'jeudi',
      Friday: 'vendredi',
      Saturday: 'samedi',
      Sunday: 'dimanche'
    },
    Months: {
      august: 'août',
      september: 'septembre',
      october: 'octobre',
      november: 'novembre',
      december: 'décembre',
      january: 'janvier',
      february: 'février',
      march: 'mars',
      april: 'avril',
      may: 'mai',
      june: 'juin',
      july: 'juillet'
    }
  }
}

export default translations
