const isDog = pet => pet.petType === 'Dog'
const isCat = pet => pet.petType === 'Cat'

const firstDogOrCat = pets => {
  const firstDog = pets.find(isDog)
  return firstDog ? firstDog : pets.find(isCat)
}

const pickAPrimary = pets => {
  const eligible = pets.filter(pet => pet.planType !== 'accidentOnly')
  const primaryPet = firstDogOrCat(eligible) || pets[0]

  return {
    pets: pets.filter(pet => pet.id !== primaryPet.id),
    primaryPet,
  }
}

module.exports = pickAPrimary
