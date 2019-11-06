const isOlderThanSix = require("./isOlderThanSix");

describe("Check if pet is over 6 years old", () => {
  test("It should default to true if no DOB provided", () => {
    expect(isOlderThanSix(null)).toBe(true);
  });

  test("It should return false if DOB less than 6 years ago", () => {
    const pet = { dob: "2015-11-06T13:52:58.740Z" };
    const date = new Date("2019-11-06T13:52:58.740Z");
    expect(isOlderThanSix(pet, date)).toBe(false);
  });

  test("It should return true if DOB greater than 6 years ago", () => {
    const pet = { dob: "2011-11-06T13:52:58.740Z" };
    const date = new Date("2019-11-06T13:52:58.740Z");
    expect(isOlderThanSix(pet, date)).toBe(true);
  });

  test("It should return true if DOB is exactly 6 years ago", () => {
    const pet = { dob: "2013-11-06T13:52:58.740Z" };
    const date = new Date("2019-11-06T13:52:58.740Z");
    expect(isOlderThanSix(pet, date)).toBe(true);
  });
});
