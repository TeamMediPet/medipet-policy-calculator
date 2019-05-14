const pickAPrimary = require('./pickAPrimary')

describe('Pick a primary pet', () => {
  test('It should set no primary if all the pets are on accident only', () => {
    const pets = [
      {
        planType: 'accidentOnly',
        petType: 'Cat',
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toBe(null)
  })

  test('It should pick the cat if the only dog is on accidently only', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual({
      planType: 'option1',
      petType: 'Cat',
    })
  })

  test('It should pick the dog if the both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
      },
      {
        petType: 'Dog',
        planType: 'option1',
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual({
      planType: 'option1',
      petType: 'Dog',
    })
  })
})
