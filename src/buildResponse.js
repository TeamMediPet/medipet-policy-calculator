const round = num => +(Math.round(num + 'e+2') + 'e-2')

const calculateMonthlySubTotal = pets =>
  pets.reduce((acc, current) => acc + current, 0)

const calculateAnnualSubTotal = (
  pets,
  monthlySubTotal,
  discountablePercentage,
) => {
  const discountableAmount = calculateMonthlySubTotal(
    pets.filter(pet => pet.planType !== 'accidentOnly'),
  )

  return (
    12 * discountableAmount * discountablePercentage +
    (monthlySubTotal - discountableAmount) * 12
  )
}

const buildResponse = (pets, pricing) => {
  const premium = (pet, mode = 'secondary') => {
    if (pet.planType === 'accidentOnly') {
      return pricing.accidentOnly
    }

    const premium = pricing[pet.planType][pet.petType.toLowerCase()][mode]
    return pet.isTopPet ? premium + pricing.topPet : premium
  }

  const petsWithPremiums = {
    primaryPet: premium(pets.primaryPet, 'primary'),
    pets: pets.pets.map(pet => premium(pet)),
  }

  const discountablePercentage = 1 - pricing.annualDiscountPercentage / 100
  const flattenedPets = [...petsWithPremiums.pets, petsWithPremiums.primaryPet]
  const monthlyServiceFee = pricing.monthlyServiceFee
  const annualServiceFee = pricing.annualServiceFee
  const monthlySubTotal = round(calculateMonthlySubTotal(flattenedPets))
  const monthlyTotal = monthlySubTotal + monthlyServiceFee
  const annualSubTotal = round(
    calculateAnnualSubTotal(
      flattenedPets,
      monthlySubTotal,
      discountablePercentage,
    ),
  )
  const annualTotal = annualSubTotal + annualServiceFee

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
