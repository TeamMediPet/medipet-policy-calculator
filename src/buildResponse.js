const monthlyServiceFee = 12
const annualServiceFee = 132

const monthlySubTotal = pets =>
  pets.reduce((acc, current) => acc + current.premium, 0)

const annualSubTotal = (pets, monthlySubTotal) => {
  const discountableAmount = monthlySubTotal(
    pets.filter(pet => pet.planType !== 'accidentOnly'),
  )
  return (
    12 * discountableAmount * 0.95 + (monthlySubTotal - discountableAmount) * 12
  )
}

const buildResponse = (pets, pricing) => {
  const premium = (pet, mode = 'secondary') => {
    if (pet.planType === 'accidentOnly') {
      return pricing.accidentOnly
    }

    const premium = pricing[pet.planType][pet.petType.toLowerCase()][mode]
    return pet.isTopPet ? premium + pricing.isTopPet : premium
  }

  const petsWithPremiums = {
    primaryPet: premium(pets.primaryPet, 'primary'),
    pets: pets.pets.map(pet => premium(pet)),
  }

  const flattenedPets = [...petsWithPremiums.pets, petsWithPremiums.primaryPet]
  const monthlySubTotal = monthlySubTotal(flattenedPets)
  const annualSubTotal = annualSubTotal(flattenedPets, monthlySubTotal)

  return {
    ...petsWithPremiums,
    monthlySubTotal,
    monthlyTotal,
    monthlyServiceFee,
    annualSubTotal,
    annualTotal,
    annualServiceFee,
  }
}

module.exports = buildResponse
