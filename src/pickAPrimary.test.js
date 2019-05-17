const pickAPrimary = require('./pickAPrimary')

describe('Pick a primary pet', () => {
  test('It should pick the first pet it finds if both pets are accident only', () => {
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

    expect(pickAPrimary(pets).primaryPet).toEqual({
      planType: 'accidentOnly',
      petType: 'Cat',
    })
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
        planType: 'option2',
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

  test('It should pick the dog of option2 if the both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Dog',
      },
      {
        petType: 'Dog',
        planType: 'option2',
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual({
      planType: 'option2',
      petType: 'Dog',
    })
  })

  test('It should pick the cat of option2 if the both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
      },
      {
        petType: 'Cat',
        planType: 'option2',
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual({
      planType: 'option2',
      petType: 'Cat',
    })
  })
})
