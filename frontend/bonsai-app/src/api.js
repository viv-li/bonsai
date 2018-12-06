import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";
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

export function fetchCashValue() {
  return axios.get(`${API_URL}/cash/`);
}

export function fetchPortfolio() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(portfolio);
    }, 300);
  });
}

export function postTransferCash(transfer) {
  return axios.post(`${API_URL}/cash/`, transfer);
}
