import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      newFeatures: 'Marketing',
      imaging: 'Imagerie',
      doctors: 'Medecins',
      contact: 'Contact',
      appointment: 'Rendez-vous',
      login: 'Connexion',
      logout: 'Deconnexion',
      otherAccount: 'Autre compte',
      dashboard: 'Tableau de bord'
    },
    admin: {
      title: 'Administration',
      dashboard: 'Tableau de bord',
      campaigns: 'Campagnes',
      leads: 'Leads',
      contentHub: 'Content Hub',
      articles: 'Publications',
      logout: 'Deconnexion',
      language: 'Langue',
      menu: 'Menu administration',
      secureArea: 'Espace securise',
      clinicAdministration: 'Administration clinique',
      languageOptions: {
        fr: 'Francais',
        en: 'Anglais'
      }
    },
    adminPages: {
      marketingDashboard: {
        title: 'Tableau de bord',
        subtitle: 'Vue rapide sur les leads et campagnes marketing.',
        loading: 'Chargement des donnees marketing...',
        leads: 'Leads',
        conversions: 'Conversions',
        recentLeads: 'Derniers leads',
        campaigns: 'Campagnes',
        campaignsSection: 'Campagnes',
        error: 'Impossible de charger les donnees marketing.'
      },
      campaigns: {
        title: 'Campagnes',
        subtitle: 'Suivi des campagnes marketing de la clinique.',
        loading: 'Chargement des campagnes...',
        error: 'Impossible de charger les campagnes.'
      },
      leads: {
        title: 'Leads',
        subtitle: 'Demandes entrantes et contacts a relancer.',
        loading: 'Chargement des leads...',
        error: 'Impossible de charger les leads.'
      },
      contentDashboard: {
        title: 'Tableau de bord contenu',
        subtitle: 'Suivez les publications, vues et partages sociaux de la clinique.',
        loading: 'Chargement du tableau de bord contenu...',
        stats: {
          articles: 'Publications',
          published: 'Publiees',
          drafts: 'Brouillons',
          views: 'Vues totales'
        },
        performance: 'Resume des performances',
        scheduled: 'Publications planifiees',
        shares: 'Partages totaux',
        quickAccess: 'Acces rapide',
        viewAll: 'Voir toutes les publications',
        create: 'Creer une publication',
        recent: 'Dernieres publications',
        recentDescription: 'Les derniers contenus crees dans le Content Hub.',
        viewAllLink: 'Tout voir',
        error: 'Impossible de charger les donnees du tableau de bord.'
      },
      contentList: {
        title: 'Publications',
        subtitle: 'Gerez les publications marketing publiees sur le site.',
        create: 'Creer une publication',
        loading: 'Chargement des publications...',
        error: 'Impossible de charger les publications.',
        emptyTitle: 'Aucune publication trouvee',
        emptyDescription: 'Creez votre premier contenu marketing.',
        total: 'Total',
        published: 'Publiees',
        drafts: 'Brouillons',
        views: 'Vues',
        deleteConfirm: 'Supprimer la publication "{title}" ?',
        publishError: 'Impossible de publier cette publication.',
        unpublishError: 'Impossible de depublier cette publication.',
        deleteError: 'Impossible de supprimer cette publication.'
      },
      contentEditor: {
        createTitle: 'Creer une publication',
        editTitle: 'Modifier la publication',
        subtitle: 'Creez, preparez et publiez du contenu marketing pour la clinique.',
        back: 'Retour aux publications',
        loading: 'Chargement de la publication...',
        notFound: 'Publication introuvable.',
        loadError: 'Impossible de charger la publication.',
        translateError: 'Impossible de traduire la publication.',
        saveError: "Impossible d'enregistrer la publication."
      },
      form: {
        translationTitle: 'Traduction automatique',
        translationHint: 'Remplissez les champs francais, puis genere la version anglaise.',
        translateToEnglish: 'Traduire en anglais',
        translating: 'Traduction...',
        englishVersion: 'Version anglaise',
        title: 'Titre',
        titleEn: 'Titre anglais',
        category: 'Categorie',
        categoryEn: 'Categorie anglaise',
        summary: 'Resume',
        summaryEn: 'Resume anglais',
        content: 'Contenu',
        contentEn: 'Contenu anglais',
        image: 'Image principale',
        imageUpload: 'Televerser une image',
        imagePlaceholder: "URL de l'image",
        imageHint: 'Selectionnez une image depuis votre appareil.',
        imageSelected: 'Image selectionnee',
        imagePreviewAlt: "Apercu de l'image principale",
        imageTooLarge: "L'image ne doit pas depasser 2 MB.",
        imageOk: 'OK',
        tags: 'Tags',
        tagsEn: 'Tags anglais',
        tagsPlaceholder: 'sante, clinique',
        author: 'Auteur',
        status: 'Statut',
        cancel: 'Annuler',
        save: 'Publier',
        saving: 'Publication...',
        draft: 'Brouillon',
        published: 'Publie',
        scheduled: 'Planifie',
        archived: 'Archive'
      },
      table: {
        article: 'Publication',
        status: 'Statut',
        category: 'Categorie',
        views: 'Vues',
        shares: 'Partages',
        actions: 'Actions',
        emptyTitle: 'Aucune publication trouvee',
        emptyDescription: 'Creez votre premier contenu marketing.',
        noCategory: 'Sans categorie',
        edit: 'Modifier',
        publish: 'Publier',
        unpublish: 'Depublier',
        delete: 'Supprimer',
        draft: 'Brouillon',
        published: 'Publie',
        scheduled: 'Planifie',
        archived: 'Archive'
      },
      marketing: {
        dashboard: {
          title: 'Tableau de bord',
          subtitle: 'Vue rapide sur les leads et campagnes marketing.',
          loading: 'Chargement des donnees marketing...',
          error: 'Impossible de charger les donnees marketing.',
          leads: 'Leads',
          campaigns: 'Campagnes',
          conversions: 'Conversions',
          recentLeads: 'Derniers leads',
          campaignsSection: 'Campagnes'
        },
        campaigns: {
          title: 'Campagnes',
          subtitle: 'Suivi des campagnes marketing de la clinique.',
          campaign: 'Campagne',
          channel: 'Canal',
          budget: 'Budget',
          objective: 'Objectif',
          status: 'Statut',
          noneDefined: 'Non defini',
          draft: 'Brouillon',
          scheduled: 'Planifiee',
          active: 'Active',
          completed: 'Terminee',
          paused: 'En pause',
          email: 'Email',
          social: 'Reseaux sociaux',
          seo: 'SEO',
          ads: 'Publicites',
          referral: 'Parrainage'
        },
        leads: {
          title: 'Leads',
          subtitle: 'Demandes entrantes et contacts a relancer.',
          patient: 'Patient',
          contact: 'Contact',
          source: 'Source',
          status: 'Statut',
          new: 'Nouveau',
          contacted: 'Contacte',
          qualified: 'Qualifie',
          converted: 'Converti',
          lost: 'Perdu'
        }
      }
    },
    hero: {
      badge: 'Soins medicaux modernes a Douala',
      title: 'Clinique Angelo',
      titleAccent: 'proche de vous',
      description: 'Une equipe medicale disponible pour la consultation, les urgences, la maternite, les soins et le suivi des patients.',
      bookBtn: 'Prendre rendez-vous',
      servicesBtn: 'Voir les services',
      doctors: 'Medecins',
      patients: 'Patients suivis'
    },
    sections: {
      about: 'A propos',
      contact: 'Contact',
      stats: 'Chiffres cles',
      testimonials: 'Temoignages'
    },
    about: {
      location: 'Localisation',
      yearCreated: 'Depuis',
      title: 'Une clinique de proximite a Logpom',
      subtitle: 'Des soins accessibles, humains et organises pour les familles de Douala.',
      description: 'La Clinique Angelo accompagne les patients avec une prise en charge generale, des examens, des soins infirmiers et un suivi adapte.',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Valeurs',
      team: 'Equipe'
    },
    services: {
      title: 'Nos services medicaux',
      description: 'Des specialites essentielles pour diagnostiquer, soigner et suivre les patients au quotidien.'
    },
    stats: {
      title: 'Une activite clinique solide',
      patientsCount: '+10k',
      patients: 'Patients',
      doctorsCount: '15+',
      doctors: 'Medecins',
      servicesCount: '12',
      services: 'Services',
      experienceCount: '12 ans',
      experience: 'Experience'
    },
    doctors: {
      title: 'Notre equipe medicale',
      description: 'Des praticiens disponibles pour vous accompagner avec attention.'
    },
    imaging: {
      title: 'Imagerie et salles equipees',
      description: 'Decouvrez les espaces et equipements utilises pour les examens et les soins.',
      equipment: 'Equipement',
      benefits: 'Avantages',
      request: 'Demander un rendez-vous',
      stats: {
        services: 'Services',
        exams: 'Examens realises',
        experience: 'Experience',
        digital: 'Processus digital'
      }
    },
    testimonials: {
      subtitle: 'Ce que disent les patients',
      description: 'Quelques retours de patients suivis par la Clinique Angelo.',
      testimonial1: 'L equipe est disponible et attentive. La consultation a ete rapide et claire.',
      testimonial2: 'Tres bon accueil et suivi serieux apres les examens.',
      testimonial3: 'Les medecins prennent le temps d expliquer les soins.',
      testimonial4: 'Un service humain et rassurant.',
      patient1: 'Marie-Claire Essomba',
      patient2: 'Jean-Paul Fotso',
      patient3: 'Chantal Nganou',
      patient4: 'Aline M.'
    },
    cta: {
      title: 'Besoin d une consultation ou d un suivi medical ?',
      description: 'Contactez la Clinique Angelo pour organiser votre passage ou obtenir une orientation.',
      button: 'Prendre rendez-vous'
    },
    contact: {
      title: 'Nous contacter',
      phone: 'Telephone',
      email: 'Email',
      address: 'Adresse'
    },
    footer: {
      description: 'Clinique medicale a Logpom, Douala.',
      quickLinks: 'Liens rapides',
      followUs: 'Nous suivre',
      copyright: '(c) 2026 Clinique Angelo. Tous droits reserves.',
      location: 'Logpom, Douala'
    },
    messages: {
      logout: 'Vous etes deconnecte.',
      switchAccount: 'Vous pouvez vous connecter avec un autre compte.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      newFeatures: 'Marketing',
      imaging: 'Imaging',
      doctors: 'Doctors',
      contact: 'Contact',
      appointment: 'Appointment',
      login: 'Login',
      logout: 'Logout',
      otherAccount: 'Other account',
      dashboard: 'Dashboard'
    },
    admin: {
      title: 'Administration',
      dashboard: 'Dashboard',
      campaigns: 'Campaigns',
      leads: 'Leads',
      contentHub: 'Content Hub',
      articles: 'Publications',
      logout: 'Logout',
      language: 'Language',
      menu: 'Administration menu',
      secureArea: 'Secured area',
      clinicAdministration: 'Clinic administration',
      languageOptions: {
        fr: 'French',
        en: 'English'
      }
    },
    adminPages: {
      marketingDashboard: {
        title: 'Dashboard',
        subtitle: 'Quick overview of leads and marketing campaigns.',
        loading: 'Loading marketing data...',
        leads: 'Leads',
        conversions: 'Conversions',
        recentLeads: 'Recent leads',
        campaigns: 'Campaigns',
        campaignsSection: 'Campaigns',
        error: 'Unable to load marketing data.'
      },
      campaigns: {
        title: 'Campaigns',
        subtitle: 'Track the clinic marketing campaigns.',
        loading: 'Loading campaigns...',
        error: 'Unable to load campaigns.'
      },
      leads: {
        title: 'Leads',
        subtitle: 'Incoming requests and contacts to follow up.',
        loading: 'Loading leads...',
        error: 'Unable to load leads.'
      },
      contentDashboard: {
        title: 'Content dashboard',
        subtitle: 'Track clinic publications, views and social shares.',
        loading: 'Loading content dashboard...',
        stats: {
          articles: 'Publications',
          published: 'Published',
          drafts: 'Drafts',
          views: 'Total views'
        },
        performance: 'Performance summary',
        scheduled: 'Scheduled publications',
        shares: 'Total shares',
        quickAccess: 'Quick access',
        viewAll: 'View all publications',
        create: 'Create a publication',
        recent: 'Recent publications',
        recentDescription: 'The latest content created in the Content Hub.',
        viewAllLink: 'View all',
        error: 'Unable to load dashboard data.'
      },
      contentList: {
        title: 'Publications',
        subtitle: 'Manage marketing publications published on the site.',
        create: 'Create a publication',
        loading: 'Loading publications...',
        error: 'Unable to load publications.',
        emptyTitle: 'No publications found',
        emptyDescription: 'Create your first marketing content.',
        total: 'Total',
        published: 'Published',
        drafts: 'Drafts',
        views: 'Views',
        deleteConfirm: 'Delete publication "{title}"?',
        publishError: 'Unable to publish this publication.',
        unpublishError: 'Unable to unpublish this publication.',
        deleteError: 'Unable to delete this publication.'
      },
      contentEditor: {
        createTitle: 'Create a publication',
        editTitle: 'Edit publication',
        subtitle: 'Create, prepare and publish marketing content for the clinic.',
        back: 'Back to publications',
        loading: 'Loading publication...',
        notFound: 'Publication not found.',
        loadError: 'Unable to load publication.',
        translateError: 'Unable to translate publication.',
        saveError: 'Unable to save publication.'
      },
      form: {
        translationTitle: 'Automatic translation',
        translationHint: 'Fill in the French fields, then generate the English version.',
        translateToEnglish: 'Translate to English',
        translating: 'Translating...',
        englishVersion: 'English version',
        title: 'Title',
        titleEn: 'English title',
        category: 'Category',
        categoryEn: 'English category',
        summary: 'Summary',
        summaryEn: 'English summary',
        content: 'Content',
        contentEn: 'English content',
        image: 'Main image',
        imageUpload: 'Upload an image',
        imagePlaceholder: 'Image URL',
        imageHint: 'Choose an image from your device.',
        imageSelected: 'Selected image',
        imagePreviewAlt: 'Main image preview',
        imageTooLarge: 'The image must not exceed 2 MB.',
        imageOk: 'OK',
        tags: 'Tags',
        tagsEn: 'English tags',
        tagsPlaceholder: 'health, clinic',
        author: 'Author',
        status: 'Status',
        cancel: 'Cancel',
        save: 'Publish',
        saving: 'Publishing...',
        draft: 'Draft',
        published: 'Published',
        scheduled: 'Scheduled',
        archived: 'Archived'
      },
      table: {
        article: 'Publication',
        status: 'Status',
        category: 'Category',
        views: 'Views',
        shares: 'Shares',
        actions: 'Actions',
        emptyTitle: 'No publications found',
        emptyDescription: 'Create your first marketing content.',
        noCategory: 'No category',
        edit: 'Edit',
        publish: 'Publish',
        unpublish: 'Unpublish',
        delete: 'Delete',
        draft: 'Draft',
        published: 'Published',
        scheduled: 'Scheduled',
        archived: 'Archived'
      },
      marketing: {
        dashboard: {
          title: 'Dashboard',
          subtitle: 'Quick overview of leads and marketing campaigns.',
          loading: 'Loading marketing data...',
          error: 'Unable to load marketing data.',
          leads: 'Leads',
          campaigns: 'Campaigns',
          conversions: 'Conversions',
          recentLeads: 'Recent leads',
          campaignsSection: 'Campaigns'
        },
        campaigns: {
          title: 'Campaigns',
          subtitle: 'Track the clinic marketing campaigns.',
          campaign: 'Campaign',
          channel: 'Channel',
          budget: 'Budget',
          objective: 'Objective',
          status: 'Status',
          noneDefined: 'Not defined',
          draft: 'Draft',
          scheduled: 'Scheduled',
          active: 'Active',
          completed: 'Completed',
          paused: 'Paused',
          email: 'Email',
          social: 'Social media',
          seo: 'SEO',
          ads: 'Ads',
          referral: 'Referral'
        },
        leads: {
          title: 'Leads',
          subtitle: 'Incoming requests and contacts to follow up.',
          patient: 'Patient',
          contact: 'Contact',
          source: 'Source',
          status: 'Status',
          new: 'New',
          contacted: 'Contacted',
          qualified: 'Qualified',
          converted: 'Converted',
          lost: 'Lost'
        }
      }
    },
    hero: {
      badge: 'Modern healthcare in Douala',
      title: 'Angelo Clinic',
      titleAccent: 'near you',
      description: 'A medical team available for consultations, emergencies, maternity care, treatment and patient follow-up.',
      bookBtn: 'Book appointment',
      servicesBtn: 'View services',
      doctors: 'Doctors',
      patients: 'Patients cared for'
    },
    sections: {
      about: 'About',
      contact: 'Contact',
      stats: 'Key figures',
      testimonials: 'Testimonials'
    },
    about: {
      location: 'Location',
      yearCreated: 'Since',
      title: 'A local clinic in Logpom',
      subtitle: 'Accessible, human and organized care for families in Douala.',
      description: 'Angelo Clinic supports patients with general care, examinations, nursing care and adapted follow-up.',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Values',
      team: 'Team'
    },
    services: {
      title: 'Our medical services',
      description: 'Essential specialties to diagnose, treat and follow patients every day.'
    },
    stats: {
      title: 'A solid clinical activity',
      patientsCount: '+10k',
      patients: 'Patients',
      doctorsCount: '15+',
      doctors: 'Doctors',
      servicesCount: '12',
      services: 'Services',
      experienceCount: '12 years',
      experience: 'Experience'
    },
    doctors: {
      title: 'Our medical team',
      description: 'Practitioners available to support you with care.'
    },
    imaging: {
      title: 'Imaging and equipped rooms',
      description: 'Discover the spaces and equipment used for examinations and care.',
      equipment: 'Equipment',
      benefits: 'Benefits',
      request: 'Request appointment',
      stats: {
        services: 'Services',
        exams: 'Exams performed',
        experience: 'Experience',
        digital: 'Digital process'
      }
    },
    testimonials: {
      subtitle: 'What patients say',
      description: 'A few comments from patients followed by Angelo Clinic.',
      testimonial1: 'The team is available and attentive. The consultation was quick and clear.',
      testimonial2: 'Very good welcome and serious follow-up after examinations.',
      testimonial3: 'The doctors take time to explain care.',
      testimonial4: 'A human and reassuring service.',
      patient1: 'Marie-Claire Essomba',
      patient2: 'Jean-Paul Fotso',
      patient3: 'Chantal Nganou',
      patient4: 'Aline M.'
    },
    cta: {
      title: 'Need a consultation or medical follow-up?',
      description: 'Contact Angelo Clinic to organize your visit or get guidance.',
      button: 'Book appointment'
    },
    contact: {
      title: 'Contact us',
      phone: 'Phone',
      email: 'Email',
      address: 'Address'
    },
    footer: {
      description: 'Medical clinic in Logpom, Douala.',
      quickLinks: 'Quick links',
      followUs: 'Follow us',
      copyright: '(c) 2026 Angelo Clinic. All rights reserved.',
      location: 'Logpom, Douala'
    },
    messages: {
      logout: 'You are logged out.',
      switchAccount: 'You can log in with another account.'
    }
  }
}

const savedLocale = localStorage.getItem('language') || 'fr'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'fr',
  messages
})

export default i18n
