const isOption2Dog = pet => pet.petType === 'Dog' && pet.planType === 'option2'
const isOption1Dog = pet => pet.petType === 'Dog' && pet.planType === 'option1'
const isOption2Cat = pet => pet.petType === 'Cat' && pet.planType === 'option2'
const isOption1Cat = pet => pet.petType === 'Cat' && pet.planType === 'option1'

const mostExpensivePet = pets => {
  let firstPet = null

  // Look through dogs first...
  firstPet = pets.find(isOption2Dog)
  if (!firstPet) {
    firstPet = pets.find(isOption1Dog)
  }
  // Then cats
  if (!firstPet) {
    firstPet = pets.find(isOption2Cat)
  }
  if (!firstPet) {
    firstPet = pets.find(isOption1Cat)
  }

  return firstPet
}

const pickAPrimary = pets => {
  const eligible = pets.filter(pet => pet.planType !== 'accidentOnly')
  const primaryPet = mostExpensivePet(eligible) || pets[0]

  return {
    pets: pets.filter(pet => pet.id !== primaryPet.id),
    primaryPet,
  }
}

module.exports = pickAPrimary
