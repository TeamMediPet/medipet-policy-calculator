const monthlyServiceFee = 14;
const annualServiceFee = monthlyServiceFee * 12;

const monthlySubTotal = pets =>
  pets.reduce((acc, current) => acc + current.price, 0);

const annualSubTotal = (pets, monthlySubTotal) => {
  const discountableAmount = monthlySubTotal(
    pets.filter(pet => pet.option !== "accidentOnly")
  );
  return (
    12 * discountableAmount * 0.95 + (monthlySubTotal - discountableAmount) * 12
  );
};

const buildResponse = (pets, pricing) => {
  const price = (pet, mode = "secondary") => {
    if (pet.option === "accidentOnly") {
      return pricing.accidentOnly;
    }

    const price = pricing[pet.option][pet.type][mode];
    return pet.topPet ? price + pricing.topPet : price;
  };

  const petsWithPrices = {
    primaryPet: price(pets.primaryPet, "primary"),
    pets: pets.pets.map(pet => price(pet))
  };

  const flattenedPets = [...petsWithPrices.pets, primaryPet];
  const monthlySubTotal = monthlySubTotal(flattenedPets);
  const annualSubTotal = annualSubTotal(flattenedPets, monthlySubTotal);

  return {
    ...petsWithPrices,
    monthlySubTotal,
    monthlyTotal,
    monthlyServiceFee,
    annualSubTotal,
    annualTotal,
    annualServiceFee
  };
};

export default buildResponse;
