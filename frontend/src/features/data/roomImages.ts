import accouchementImage from '@/assets/images/clinic/accouchement.png'
import attenteImage from '@/assets/images/clinic/attente.png'
import blocImage from '@/assets/images/clinic/bloc.png'
import consultationImage from '@/assets/images/clinic/consultation.png'
// import exterieurImage from '@/assets/images/clinic/exterieur.png'
import hospitalisationImage from '@/assets/images/clinic/hospitalisation.png'
// import logoImage from '@/assets/images/clinic/logo.png'
import pharmacieImage from '@/assets/images/clinic/pharmacie.png'
import soinImage from '@/assets/images/clinic/soin.png'

export const roomImages: Record<string, string> = {
  consultation: consultationImage,
  soin: soinImage,
  soins: soinImage,
  bloc: blocImage,
  blocOperatoire: blocImage,
  'bloc-operatoire': blocImage,
  'block-operatoire': blocImage,
  'block operatoire': blocImage,
  accouchement: accouchementImage,
  pharmacie: pharmacieImage,
  hospitalisation: hospitalisationImage,
  attente: attenteImage,
  // exterieur: exterieurImage,
  // logo: logoImage
}
