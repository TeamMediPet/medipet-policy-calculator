const pickAPrimary = require('./pickAPrimary')

describe('Pick a primary pet', () => {
  test('It should pick the first pet it finds if both pets are accident only', () => {
    const pets = [
      {
        planType: 'accidentOnly',
        petType: 'Cat',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
        dob: nYearsAgo(5),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[0])
  })

  test('It should pick the cat if the only dog is on accidently only', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
        dob: nYearsAgo(5),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[0])
  })

  test('It should pick the dog if the both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
        dob: nYearsAgo(5),
      },
      {
        planType: 'option2',
        petType: 'Cat',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'option1',
        dob: nYearsAgo(5),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[2])
  })

  test('It should pick the dog of option2 if both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Dog',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'option2',
        dob: nYearsAgo(5),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[1])
  })

  test('It should pick the cat of option2 if the both are eligible', () => {
    const pets = [
      {
        planType: 'option1',
        petType: 'Cat',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Cat',
        planType: 'option2',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'accidentOnly',
        dob: nYearsAgo(5),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[1])
  })

  const nYearsAgo = n => new Date().setFullYear(new Date().getFullYear() - n)

  test('It should pick the younger dog if the other is over 6', () => {
    const pets = [
      {
        petType: 'Dog',
        planType: 'option1',
        dob: nYearsAgo(5),
      },
      {
        petType: 'Dog',
        planType: 'option2',
        dob: nYearsAgo(7),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[0])
  })

  test('It should pick the cat if other dogs are over 6', () => {
    const pets = [
      {
        petType: 'Dog',
        planType: 'option1',
        dob: nYearsAgo(7),
      },
      {
        petType: 'Cat',
        planType: 'option1',
        dob: nYearsAgo(7),
      },
      {
        petType: 'Dog',
        planType: 'option2',
        dob: nYearsAgo(7),
      },
    ]

    expect(pickAPrimary(pets).primaryPet).toEqual(pets[1])
  })
})
