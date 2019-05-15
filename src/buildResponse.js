const round = num => +(Math.round(num + 'e+2') + 'e-2')

// Sum the monthly subtotal of all pets
const calculateMonthlySubTotal = pets =>
  pets.reduce((acc, current) => acc + current.gross, 0)

// Sum the annual subtotal of all pets considering discount
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
    const { id } = pet
    const net =
      pet.planType === 'accidentOnly'
        ? pricing.accidentOnly
        : pricing[pet.planType][pet.petType.toLowerCase()][mode]
    const addOn = pet.isTopPet ? pricing.topPet : 0

    return {
      id,
      net,
      addOn,
      gross: net + addOn,
    }
  }

  // If there are 4 or more pets (1 primary + 3 secondary) on an application
  // then all pets will get secondary rate
  const primaryPetMode = pets.pets.length > 2 ? 'secondary' : 'primary'

  const petsWithPremiums = {
    primaryPet: premium(pets.primaryPet, primaryPetMode),
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
