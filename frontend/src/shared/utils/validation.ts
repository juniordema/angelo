
export function isValidEmail(email: string) {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) return false
  if (email.length > 254) return false // RFC 5321
  if (email.startsWith('.') || email.endsWith('.')) return false
  if (email.includes('..')) return false
  
  const [localPart, domain] = email.split('@')
  if (localPart.length > 64) return false // RFC 5321
  if (domain.length < 3) return false
  
  return true
}


export function isValidPhone(phone: string) {
  if (!phone || typeof phone !== 'string') return false
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  
  const cameroonPhoneRegex = /^(\+237|237|0)?[6789]\d{8}$/
  
  if (!cameroonPhoneRegex.test(cleaned)) return false
  
  const numberOnly = cleaned.replace(/^(\+237|237|0)/, '')
  if (numberOnly.length < 9 || numberOnly.length > 10) return false
  
  return true
}


export function formatPhoneDisplay(phone: string) {
  if (!phone || typeof phone !== 'string') return ''
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  let normalized = cleaned
  if (cleaned.startsWith('0') && !cleaned.startsWith('0237')) {
    normalized = '237' + cleaned.substring(1)
  } else if (!cleaned.startsWith('+') && !cleaned.startsWith('237')) {
    normalized = '237' + cleaned
  }
  
  normalized = normalized.replace('+', '')
  
  if (normalized.length === 12) {
    return `+${normalized.slice(0, 3)} ${normalized.slice(3, 4)} ${normalized.slice(4, 6)} ${normalized.slice(6, 8)} ${normalized.slice(8, 10)} ${normalized.slice(10, 12)}`
  }
  
  return phone
}


export function normalizePhone(phone: string) {
  if (!phone || typeof phone !== 'string') return ''
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  
  let normalized = cleaned
  
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    normalized = '237' + cleaned.substring(1)
  } else if (cleaned.startsWith('+237')) {
    normalized = cleaned.substring(1)
  } else if (cleaned.startsWith('237') && cleaned.length === 11) {
    normalized = cleaned
  } else if (!cleaned.startsWith('237') && cleaned.length === 9) {
    normalized = '237' + cleaned
  }
  
  return `+${normalized}`
}


export function getEmailError(email: string) {
  if (!email) return 'L\'email est requis'
  if (!email.includes('@')) return 'L\'email doit contenir un @'
  if (email.length > 254) return 'L\'email est trop long'
  if (!isValidEmail(email)) return 'Format d\'email invalide (ex: user@example.com)'
  return null
}


export function getPhoneError(phone: string) {
  if (!phone) return 'Le téléphone est requis'
  
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  if (cleaned.length < 9) return 'Le numéro est trop court'
  if (cleaned.length > 13) return 'Le numéro est trop long'
  
  if (!isValidPhone(phone)) {
    return 'Format invalide. Utilisez: +237 6XX XX XX XX ou 06XX XX XX XX'
  }
  
  return null
}
