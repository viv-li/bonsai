import Vue from "vue";
import Vuex from "vuex";

import { fetchCashValue, fetchPortfolio, postTransferCash } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // single source of data
    cashValue: 0,
    portfolio: []
  },
  mutations: {
    // isolated data mutations
    setCashValue(state, payload) {
      state.cashValue = payload.cashValue;
    },
    setPortfolio(state, payload) {
      state.portfolio = payload.portfolio;
    },
    setStock(state, payload) {
      state.stock = payload.stock;
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
      return fetchPortfolio().then(response =>
        context.commit("setPortfolio", { portfolio: response })
      );
    },
    loadStock(context, symbol) {
      return fetchStock(symbol).then(response =>
        context.commit("setStock", { stock: response })
      );
    },
    transferCash(context, transfer) {
      return postTransferCash(transfer);
    }
  }
});
