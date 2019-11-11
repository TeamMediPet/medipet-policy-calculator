const isOlderThanSix = (pet, explicitDate) => {
  if (!pet || !pet.dob) return true

  const today = explicitDate || new Date()
  const birthDate = new Date(pet.dob)
  const m = today.getMonth() - birthDate.getMonth()
  let age = today.getFullYear() - birthDate.getFullYear()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age >= 6
}

module.exports = isOlderThanSix
