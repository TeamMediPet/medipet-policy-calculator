const isDog = pet => pet.type === "dog";
const isCat = pet => pet.type === "cat";

const firstDogOrCat = pets => {
  const firstDog = pets.find(isDog);
  return firstDog ? firstDog : pets.find(isCat);
};

const pickAPrimary = pets => {
  const eligible = pets.filter(pet => pet.option !== "accidentOnly");
  const primaryPet = firstDogOrCat(eligible) || null;

  return {
    pets: primaryPet ? pets.filter(pet => pet.name !== primaryPet.name) : pets,
    primaryPet
  };
};

module.exports = pickAPrimary;
