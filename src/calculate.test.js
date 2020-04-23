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
        dog: {
          primary: 355,
          secondary: 337,
        },
        cat: {
          primary: 304,
          secondary: 289,
        },
      },
      option2: {
        dog: {
          primary: 448,
          secondary: 425,
        },
        cat: {
          primary: 362,
          secondary: 343,
        },
      },
      lite: 270,
      accidentOnly: 195,
      topPet: 65,
      monthlyServiceFee: 15,
      annualServiceFee: 132,
      annualDiscountPercentage: 5,
      olderThanSixIncreasePercentage: 12,
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
