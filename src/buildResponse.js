const round = num => +(Math.round(num + 'e+2') + 'e-2')

const buildResponse = (pets, pricing) => {
  const discountablePercentage = 1 - pricing.annualDiscountPercentage / 100
  const monthlyServiceFee = pricing.monthlyServiceFee
  const annualServiceFee = pricing.annualServiceFee

  const premium = (pet, mode = 'secondary') => {
    const { id } = pet
    const net =
      pet.planType === 'accidentOnly'
        ? pricing.accidentOnly
        : pricing[pet.planType][pet.petType.toLowerCase()][mode]
    const addOn = pet.isTopPet ? pricing.topPet : 0
    const gross = round(net + addOn)

    const netAnnual = round(net * 12 * discountablePercentage)
    const addOnAnnual = round(addOn * 12)
    const grossAnnual = round(netAnnual + addOnAnnual)

    return {
      id,
      net,
      addOn,
      gross,
      netAnnual,
      addOnAnnual,
      grossAnnual,
    }
  }

  // If there are 4 or more pets (1 primary + 3 secondary) on an application
  // then all pets will get secondary rate
  const isBulkDiscount = pets.pets.length > 2

  const petsWithPremiums = {
    primaryPet: premium(
      pets.primaryPet,
      isBulkDiscount ? 'secondary' : 'primary',
    ),
    pets: pets.pets.map(pet => premium(pet)),
  }

  const flattenedPets = [petsWithPremiums.primaryPet, ...petsWithPremiums.pets]
  const monthlySubTotal = round(
    flattenedPets.reduce((acc, current) => acc + current.gross, 0),
  )
  const monthlyTotal = round(monthlySubTotal + monthlyServiceFee)
  const annualSubTotal = round(
    flattenedPets.reduce((acc, current) => acc + current.grossAnnual, 0),
  )

  const annualTotal = round(annualSubTotal + annualServiceFee)

  return {
    pets: flattenedPets,
    monthlySubTotal,
    monthlyTotal,
    monthlyServiceFee,
    annualSubTotal,
    annualTotal,
    annualServiceFee,
  }
}

module.exports = buildResponse
