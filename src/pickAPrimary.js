const isOlderThanSix = require('./isOlderThanSix')

const isOption2Dog = pet => pet.petType === 'Dog' && pet.planType === 'option2'
const isOption1Dog = pet => pet.petType === 'Dog' && pet.planType === 'option1'
const isOption2Cat = pet => pet.petType === 'Cat' && pet.planType === 'option2'
const isOption1Cat = pet => pet.petType === 'Cat' && pet.planType === 'option1'

const findPrimary = pets => {
  let firstPet = null

  if (!pets.length) return firstPet

  firstPet = pets.find(isOption2Dog)
  if (firstPet) return firstPet

  firstPet = pets.find(isOption1Dog)
  if (firstPet) return firstPet

  firstPet = pets.find(isOption2Cat)
  if (firstPet) return firstPet

  firstPet = pets.find(isOption1Cat)
  return firstPet
}

const pickAPrimary = pets => {
  // Filter out accident/lite from prefered set
  const eligible = pets.filter(
    pet => pet.planType !== 'accidentOnly' || pet.planType !== 'lite',
  )

  // Filter dogs older than six from most preferred set
  const youngerThanSix = eligible.filter(pet =>
    pet.petType === 'Cat' ? true : !isOlderThanSix(pet),
  )

  // Choose, in order, most expensive from [young dogs, any age cats, no accident/lite], OR [any age, no accident/lite], OR [any age, any plan]
  const primaryPet =
    findPrimary(youngerThanSix) || findPrimary(eligible) || pets[0]

  return {
    pets: pets.filter(pet => pet.id !== primaryPet.id),
    primaryPet,
  }
}

module.exports = pickAPrimary
