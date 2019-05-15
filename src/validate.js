const calculate = require('./calculate')
const deepEqual = require('deep-equal')

const validate = (policy, pets, pricing) => {
  const calculator = calculate(pricing)

  return deepEqual(policy, calculator(pets))
}

module.exports = validate
