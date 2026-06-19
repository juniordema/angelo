export type Service = {
  name: string
  nameEn: string
  icon: string
  desc: string
  descEn: string
  color: string
  bgClass: string
}

export const services: Service[] = [
  {
    name: 'Consultation Générale',
    nameEn: 'General Consultation',
    icon: 'fas fa-stethoscope',
    desc: 'Examens complets, diagnostic et suivi médical général pour toute la famille.',
    descEn: 'Full examinations, diagnosis and general medical follow-up for the whole family.',
    color: '#0A6B5C',
    bgClass: 'bg-primary-50'
  },
  {
    name: 'Cardiologie',
    nameEn: 'Cardiology',
    icon: 'fas fa-heartbeat',
    desc: 'Bilan cardiaque, ECG, échographie cardiaque et suivi des pathologies cardiovasculaires.',
    descEn: 'Cardiac assessment, ECG, cardiac ultrasound and follow-up for cardiovascular conditions.',
    color: '#E74C3C',
    bgClass: 'bg-red-50'
  },
  {
    name: 'Pédiatrie',
    nameEn: 'Pediatrics',
    icon: 'fas fa-baby',
    desc: 'Soins médicaux adaptés aux nourrissons, enfants et adolescents.',
    descEn: 'Medical care tailored to infants, children and adolescents.',
    color: '#3498DB',
    bgClass: 'bg-blue-50'
  },
  {
    name: 'Gynécologie-Obstétrique',
    nameEn: 'Gynecology and Obstetrics',
    icon: 'fas fa-female',
    desc: 'Suivi gynécologique, échographies obstétricales, accouchement et planification familiale.',
    descEn: 'Gynecological follow-up, obstetric ultrasounds, childbirth and family planning.',
    color: '#E91E8C',
    bgClass: 'bg-pink-50'
  },
  {
    name: 'Dermatologie',
    nameEn: 'Dermatology',
    icon: 'fas fa-allergies',
    desc: 'Diagnostic et traitement des maladies de la peau, allergies et esthétique dermatologique.',
    descEn: 'Diagnosis and treatment of skin diseases, allergies and dermatological aesthetics.',
    color: '#F39C12',
    bgClass: 'bg-amber-50'
  },
  {
    name: 'Ophtalmologie',
    nameEn: 'Ophthalmology',
    icon: 'fas fa-eye',
    desc: 'Examens de la vue, correction optique, traitement du glaucome et de la cataracte.',
    descEn: 'Eye exams, optical correction, glaucoma and cataract treatment.',
    color: '#9B59B6',
    bgClass: 'bg-purple-50'
  }
]
