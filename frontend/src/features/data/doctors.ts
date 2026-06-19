
import doctor1 from '../../assets/images/doctor/Doctor1.png'
import doctor2 from '../../assets/images/doctor/Doctor2.png'
import doctor3 from '../../assets/images/doctor/Doctor3.png'

export type Locale = 'fr' | 'en'

export type DoctorLocale = {
  specialty: string
  specialties: string[]
  bio: string
}

export type Doctor = {
  id: number
  name: string
  experience: number
  patients: number
  rating: number
  photo: string
  availability: string[]
  email?: string
  phone?: string
  locales: Record<Locale, DoctorLocale>
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'NGO NDJEL BERNADETTE GAELLE',
    experience: 6,
    patients: 3200,
    rating: 4.8,
    photo: doctor1,
    availability: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    email:'gaellendjel@yahoo.com',
    phone:'673175015',
    locales: {
      fr: {
        specialty: 'Médecine Générale',
        specialties: ['Consultation Générale'],
        bio: "Le Dr. NGO NDJEL BERNADETTE GAELLE est un médecin généraliste expérimenté..."
      },

      en: {
        specialty: 'General Medicine',
        specialties: ['General Consultation'],
        bio: 'Dr. NGO NDJEL BERNADETTE GAELLE is an experienced general practitioner...'
      }
    }
  },

  {
    id: 2,
    name: 'BOUGUEN MBON LOLITA RUTH',
    experience: 8,
    patients: 1800,
    rating: 4.9,
    photo: doctor2,
    availability: ['Lun', 'Mar', 'Jeu', 'Sam'],
    email: 'bouguenruth@gmail.com',
    phone: '656059205',

    locales: {
      fr: {
        specialty: 'Médecine Générale',
        specialties: ['Cardiologie', 'Consultation Générale'],
        bio: "Le Dr. BOUGUEN MBON LOLITA RUTH est cardiologue..."
      },

      en: {
        specialty: 'Cardiology',
        specialties: ['Cardiology', 'General Consultation'],
        bio: 'Dr. BOUGUEN MBON LOLITA RUTH is a cardiologist...'
      }
    }
  },

  {
    id: 3,
    name: 'KEMGIA MIKEAL LAURE',
    experience: 10,
    patients: 2500,
    rating: 4.7,
    photo: doctor3,
    availability: ['Mar', 'Mer', 'Ven', 'Sam'],
    email:'Mikaellaurekemgia@gmail.com',
    phone:'673044267',
    locales: {
      fr: {
        specialty: 'Médecine Générale',
        specialties: ['Pédiatrie'],
        bio: "Le Dr. KEMGIA MIKEAL LAURE est une pédiatre passionnée..."
      },

      en: {
        specialty: 'Pediatrics',
        specialties: ['Pediatrics'],
        bio: 'Dr. KEMGIA MIKEAL LAURE is a passionate pediatrician...'
      }
    }
  }
]
