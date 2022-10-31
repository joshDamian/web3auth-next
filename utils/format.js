import { utils } from "ethers";

export const formatToEther = (wei, decimals = 18) => {
  return utils.formatUnits(wei, decimals);
};

export const roundOff = (number, places = null) => {
  return Number(number).toFixed(places ?? 2);
};

export const formatAsDollar = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(roundOff(number));
};
