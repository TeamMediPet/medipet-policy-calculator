const calculate = require("./calculate");

const validate = (policy, pets, pricing) => {
  const calculator = calculate(pricing);
  return policy === calculator(pets);
};

module.exports = validate;
