import Vue from "vue";
import Vuex from "vuex";

import {
  fetchCashValue,
  fetchPortfolio,
  postTransferCash,
  postTransferStock
} from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // single source of data
    cashValue: 0,
    portfolio: {
      VFINX: { quantity: 0, price: 0 },
      NAESX: { quantity: 0, price: 0 },
      VGTSX: { quantity: 0, price: 0 },
      VBMFX: { quantity: 0, price: 0 }
    }
  },
  mutations: {
    // isolated data mutations
    setCashValue(state, payload) {
      state.cashValue = payload.cashValue;
    },
    setPortfolio(state, payload) {
      state.portfolio = payload.portfolio;
    }
  },
  actions: {
    // asynchronous operations
    loadCashValue(context) {
      return fetchCashValue().then(response =>
        context.commit("setCashValue", { cashValue: response.data.cashValue })
      );
    },
    loadPortfolio(context) {
      return fetchPortfolio().then(response => {
        context.commit("setPortfolio", { portfolio: response.data.portfolio });
      });
    },
    transferCash(context, transfer) {
      return postTransferCash(transfer);
    },
    transferStock(context, transfer) {
      return postTransferStock(transfer.symbol, transfer.amount);
    }
  }
});
