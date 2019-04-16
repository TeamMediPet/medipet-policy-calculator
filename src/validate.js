import calculate from "./calculate";

const validate = (policy, pets, pricing) => {
  const calculator = calculate(pricing);
  return policy === calculator(pets);
};

export default validate;
