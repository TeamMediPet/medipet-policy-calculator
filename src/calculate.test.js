const calculate = require('./calculate')

describe('calculate', () => {
  test('it should reject if there are no pets passed to it', () => {
    expect(() => calculate({})(null)).toThrow(TypeError)
    expect(() => calculate({})(undefined)).toThrow(TypeError)
  })

  test('it should return an empty result set when passed no pets', () => {
    expect(calculate({})([])).toEqual({
      pets: [],
      monthlyTotal: 0,
      monthlySubTotal: 0,
      monthlyServiceFee: 0,
      annualTotal: 0,
      annualSubTotal: 0,
      annualServiceFee: 0,
    })
  })

  test('test', () => {
    const pricing = {
      option1: {
        dog: { primary: 326.51, secondary: 293.85 },
        cat: { primary: 280.09, secondary: 252.08 },
      },
      option2: {
        dog: { primary: 411.62, secondary: 370.46 },
        cat: { primary: 331.96, secondary: 298.76 },
      },
      accidentOnly: 178,
      topPet: 60,
      monthlyServiceFee: 12,
      annualServiceFee: 132,
      annualDiscountPercentage: 5,
    }

    const pets = [
      {
        id: 'abc123',
        planType: 'option1',
        petType: 'Dog',
        isTopPet: true,
      },
      {
        id: 'abc345',
        planType: 'option1',
        petType: 'Dog',
        isTopPet: true,
      },
      {
        id: 'abc678',
        planType: 'option1',
        petType: 'Dog',
        isTopPet: true,
      },
      {
        id: 'abc982',
        planType: 'option1',
        petType: 'Dog',
        isTopPet: true,
      },
    ]

    const result = calculate(pricing)(pets)

    console.log(result)
  })
})
