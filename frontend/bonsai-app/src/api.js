import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export function fetchCashValue() {
  return axios.get(`${API_URL}/cash/`);
}

export function fetchPortfolio() {
  return axios.get(`${API_URL}/portfolio/`);
}

export function postTransferCash(transfer) {
  return axios.post(`${API_URL}/cash/`, transfer);
}

export function postTransferStock(symbol, transfer) {
  return axios.post(`${API_URL}/stock/` + symbol, transfer);
}
