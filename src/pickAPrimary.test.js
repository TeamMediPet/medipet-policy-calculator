const pickAPrimary = require("./pickAPrimary");

describe("Pick a primary pet", () => {
  test("It should set no primary if all the pets are on accident only", () => {
    const pets = [
      {
        option: "accidentOnly",
        type: "cat"
      },
      {
        type: "dog",
        option: "accidentOnly"
      }
    ];

    expect(pickAPrimary(pets).primaryPet).toBe(null);
  });

  test("It should pick the cat if the only dog is on accidently only", () => {
    const pets = [
      {
        option: "option1",
        type: "cat"
      },
      {
        type: "dog",
        option: "accidentOnly"
      }
    ];

    expect(pickAPrimary(pets).primaryPet).toEqual({
      option: "option1",
      type: "cat"
    });
  });

  test("It should pick the dog if the both are eligible", () => {
    const pets = [
      {
        option: "option1",
        type: "cat"
      },
      {
        type: "dog",
        option: "option1"
      }
    ];

    expect(pickAPrimary(pets).primaryPet).toEqual({
      option: "option1",
      type: "dog"
    });
  });
});
