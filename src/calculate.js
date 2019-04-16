import buildResponse from "./buildResponse";
import pickAPrimary from "./pickAPrimary";

const emptyResponse = {
  primaryPet: null,
  pets: [],
  monthlyTotal: 0,
  monthlySubTotal: 0,
  monthlyServiceFee: 0,
  annualTotal: 0,
  annualSubTotal: 0,
  annualServiceFee: 0
};

const buildCalculator = pricing => {
  if (!pricing) {
    throw new TypeError("No pricing provided");
  }

  return pets => {
    if (!pets) {
      throw new TypeError("You must provide pets");
    }

    if (!pets.length) {
      return emptyResponse;
    }

    return buildResponse(pickAPrimary(pets), pricing);
  };
};

export default buildCalculator;
