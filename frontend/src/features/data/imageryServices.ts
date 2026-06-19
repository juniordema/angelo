import { roomImages } from '@/features/data/roomImages'

export type ImageryService = {
  id: number
  name: string
  nameEn?: string
  icon: string
  image: string
  roomName: string
  roomNameEn: string
  roomDescription: string
  roomDescriptionEn: string
  imageAlt: string
  imageAltEn: string
  description: string
  descriptionEn: string
  equipment: string
  equipmentEn: string
  benefits: string[]
  benefitsEn: string[]
}

export type LocalizedImageryService = ImageryService & {
  displayName: string
  displayDescription: string
  displayEquipment: string
  displayBenefits: string[]
  displayRoomName: string
  displayRoomDescription: string
  displayImageAlt: string
}

export const imageryServices: ImageryService[] = [
  {
    id: 1,
    name: 'Radiologie Générale',
    nameEn: 'General Radiology',
    icon: 'fas fa-x-ray',
    image: roomImages.consultation,
    roomName: 'Salle de consultation',
    roomNameEn: 'Consultation room',
    roomDescription: "Espace calme pour l'accueil du patient, l'examen clinique, les premiers bilans et les conseils du médecin dans un cadre rassurant.",
    roomDescriptionEn: 'A quiet space for patient reception, clinical examination, initial assessment and medical guidance in a reassuring setting.',
    imageAlt: 'Espace de consultation médicale',
    imageAltEn: 'Medical consultation area',
    description: 'Radiographies osseuses, pulmonaires et abdominales',
    descriptionEn: 'Bone, chest and abdominal X-rays',
    equipment: 'Système radiographique numérique haute résolution',
    equipmentEn: 'High-resolution digital radiography system',
    benefits: [
      'Diagnostic rapide',
      'Faible radiation',
      'Résultats immédiats',
      'Technologie moderne'
    ],
    benefitsEn: ['Fast diagnosis', 'Low radiation', 'Immediate results', 'Modern technology']
  },
  {
    id: 2,
    name: 'Échographie',
    nameEn: 'Ultrasound',
    icon: 'fas fa-heart',
    image: roomImages.soin,
    roomName: 'Salle de soins',
    roomNameEn: 'Treatment room',
    roomDescription: 'Salle dédiée aux soins courants, aux pansements, aux injections, au suivi infirmier et aux interventions rapides du quotidien.',
    roomDescriptionEn: 'A room dedicated to routine care, dressings, injections, nursing follow-up and everyday quick interventions.',
    imageAlt: 'Soins médicaux assistés',
    imageAltEn: 'Assisted medical care',
    description: 'Échographie cardiaque, abdominale, pelvienne et mammaire',
    descriptionEn: 'Cardiac, abdominal, pelvic and breast ultrasound',
    equipment: 'Échographe Doppler couleur haute performance',
    equipmentEn: 'High-performance color Doppler ultrasound unit',
    benefits: [
      'Pas de radiation',
      'Temps réel',
      'Non invasive',
      'Très précise'
    ],
    benefitsEn: ['No radiation', 'Real-time', 'Non-invasive', 'Highly accurate']
  },
  {
    id: 4,
    name: 'IRM',
    icon: 'fas fa-brain',
    image: roomImages.bloc,
    roomName: 'Bloc opératoire',
    roomNameEn: 'Operating room',
    roomDescription: 'Salle stérile et équipée pour réaliser les interventions dans de bonnes conditions de sécurité, de confort et de surveillance.',
    roomDescriptionEn: 'A sterile, equipped room for performing procedures in safe, comfortable and monitored conditions.',
    imageAlt: 'Bloc opératoire équipé',
    imageAltEn: 'Equipped operating room',
    description: 'Imagerie par résonance magnétique - Cerveau, colonne, articulations',
    descriptionEn: 'Magnetic resonance imaging for brain, spine and joints',
    equipment: 'IRM 1.5 Tesla avec technologie avancée',
    equipmentEn: '1.5 Tesla MRI with advanced technology',
    benefits: [
      'Sans radiation',
      'Très détaillée',
      'Contraste excellent',
      'Contraste injecté optionnel'
    ],
    benefitsEn: ['No radiation', 'Highly detailed', 'Excellent contrast', 'Optional contrast injection']
  },
  {
    id: 5,
    name: 'Mammographie',
    nameEn: 'Mammography',
    icon: 'fas fa-ribbon',
    image: roomImages.accouchement,
    roomName: "Salle d'accouchement",
    roomNameEn: 'Delivery room',
    roomDescription: "Salle aménagée pour accompagner la maman et le bébé pendant l'accouchement, avec un environnement rassurant et organisé.",
    roomDescriptionEn: 'A room arranged to support the mother and baby during delivery, in a reassuring and organized environment.',
    imageAlt: 'Service maternité et accouchement',
    imageAltEn: 'Maternity and childbirth department',
    description: 'Dépistage et diagnostic du cancer du sein',
    descriptionEn: 'Breast cancer screening and diagnosis',
    equipment: 'Mammographe numérique 3D (Tomosynthèse)',
    equipmentEn: '3D digital mammography system (tomosynthesis)',
    benefits: [
      'Détection précoce',
      'Faible dose',
      'Précision accrue',
      'Pour tous les âges'
    ],
    benefitsEn: ['Early detection', 'Low dose', 'Greater precision', 'For all ages']
  },
  {
    id: 6,
    name: 'Radiologie Dentaire',
    nameEn: 'Dental Radiology',
    icon: 'fas fa-tooth',
    image: roomImages.pharmacie,
    roomName: 'Pharmacie',
    roomNameEn: 'Pharmacy',
    roomDescription: 'Espace de stockage et de délivrance des médicaments prescrits aux patients, avec un accès rapide aux traitements nécessaires.',
    roomDescriptionEn: 'A space for storing and dispensing medications prescribed to patients, with quick access to required treatments.',
    imageAlt: 'Pharmacie de la clinique',
    imageAltEn: 'Clinic pharmacy',
    description: 'Radiographies dentaires panoramiques et intra-orales',
    descriptionEn: 'Panoramic and intraoral dental X-rays',
    equipment: 'Radiographe dentaire numérique panoramique',
    equipmentEn: 'Digital panoramic dental X-ray system',
    benefits: [
      'Haute résolution',
      'Très peu de radiation',
      'Images immédiatement',
      'Vision 3D optionnelle'
    ],
    benefitsEn: ['High resolution', 'Very low radiation', 'Immediate images', 'Optional 3D view']
  },
  {
    id: 7,
    name: 'Ostéodensitométrie',
    nameEn: 'Bone Densitometry',
    icon: 'fas fa-bone',
    image: roomImages.hospitalisation,
    roomName: "Chambre d'hospitalisation",
    roomNameEn: 'Hospital room',
    roomDescription: 'Chambre confortable pour le repos, la surveillance médicale, l’accompagnement du patient et une récupération plus sereine.',
    roomDescriptionEn: 'A comfortable room for rest, medical monitoring, patient support and a more peaceful recovery.',
    imageAlt: "Chambre d'hospitalisation",
    imageAltEn: 'Hospitalization room',
    description: 'Mesure de la densité osseuse (dépistage ostéoporose)',
    descriptionEn: 'Bone density measurement for osteoporosis screening',
    equipment: 'Densitomètre osseux DEXA',
    equipmentEn: 'DEXA bone densitometer',
    benefits: [
      'Dépistage précoce',
      'Très faible radiation',
      'Résultat immédiat',
      'Suivi facile'
    ],
    benefitsEn: ['Early screening', 'Very low radiation', 'Immediate results', 'Easy follow-up']
  },
  {
    id: 8,
    name: 'Fluoroscopie',
    nameEn: 'Fluoroscopy',
    icon: 'fas fa-circle-radiation',
    image: roomImages.attente,
    roomName: "Salle d'attente",
    roomNameEn: 'Waiting room',
    roomDescription: "Espace d'accueil où les patients et accompagnants patientent avant la consultation, dans un cadre propre et organisé.",
    roomDescriptionEn: 'A reception space where patients and companions wait before consultation in a clean and organized setting.',
    imageAlt: "Salle d'attente de la clinique",
    imageAltEn: 'Clinic waiting room',
    description: 'Imagerie en temps réel pour interventions guidées',
    descriptionEn: 'Real-time imaging for guided procedures',
    equipment: 'Système de fluoroscopie numérique avancé',
    equipmentEn: 'Advanced digital fluoroscopy system',
    benefits: [
      'Guidage précis',
      'Temps réel',
      'Pour les gestes',
      'Technologie moderne'
    ],
    benefitsEn: ['Precise guidance', 'Real-time', 'Procedure support', 'Modern technology']
  },
]
