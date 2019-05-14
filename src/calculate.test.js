const calculate = require('./calculate')({})

describe('calculate', () => {
  test('it should reject if there are no pets passed to it', () => {
    expect(() => calculate(null)).toThrow(TypeError)
    expect(() => calculate(undefined)).toThrow(TypeError)
  })

  test('it should return an empty result set when passed no pets', () => {
    expect(calculate([])).toEqual({
      primaryPet: null,
      pets: [],
      monthlyTotal: 0,
      monthlySubTotal: 0,
      monthlyServiceFee: 0,
      annualTotal: 0,
      annualSubTotal: 0,
      annualServiceFee: 0,
    })
  })
})
