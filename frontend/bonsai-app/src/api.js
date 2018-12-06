import axios from "axios";

const PF_NO_BRAINER = ["VFINX", "NAESX", "VGTSX", "VBMFX"];
const AV_API_URL = "https://www.alphavantage.co/query?apikey=9G4G4R3GA5E5ENSZ&";

// Fake data
var cashValue = 500.31;
var portfolio = {
  VFINX: {
    name: "Vanguard 500 Index Fund Investor Shares",
    quantity: 0,
    currValue: 250.19
  },
  NAESX: {
    name: "Vanguard Small Capitalization Index Fund Investor Shares",
    quantity: 4,
    currValue: 69.48
  },
  VGTSX: {
    name: "Vanguard Total International Stock Index Fund Investor Shares",
    quantity: 16,
    currValue: 15.98
  },
  VBMFX: {
    name: "Vanguard Total Bond Market Index Fund Investor Shares",
    quantity: 25,
    currValue: 10.33
  }
};

export function fetchCashValue(surveyId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cashValue);
    }, 300);
  });
}

export function fetchPortfolio() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(portfolio);
    }, 300);
  });
}

export function postTransferCash(transferAmount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cashValue + transferAmount < 0) {
        reject();
      } else {
        cashValue += transferAmount;
        resolve();
      }
    }, 300);
  });
}
