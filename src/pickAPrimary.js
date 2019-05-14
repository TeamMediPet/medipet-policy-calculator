const isDog = pet => pet.petType === 'Dog'
const isCat = pet => pet.petType === 'Cat'

const firstDogOrCat = pets => {
  const firstDog = pets.find(isDog)
  return firstDog ? firstDog : pets.find(isCat)
}

const pickAPrimary = pets => {
  const eligible = pets.filter(pet => pet.planType !== 'accidentOnly')
  const primaryPet = firstDogOrCat(eligible) || null

  return {
    pets: primaryPet ? pets.filter(pet => pet.id !== primaryPet.id) : pets,
    primaryPet,
  }
}

module.exports = pickAPrimary
