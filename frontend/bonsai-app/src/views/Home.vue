<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column" v-if="portfolioValue">
              <h2 class="subtitle is-3">Total asset value</h2>
              <h1 class="title is-1 is-spaced">
                <span class="title is-3">$</span>
                {{ totalAssetValue.toFixed(2) }}
              </h1>
            </div>
            <div class="column">
              <h2 class="subtitle is-6">Portfolio value (based on current stock prices)</h2>
              <h1 class="title is-2 is-spaced">
                <span class="title is-4">$</span>
                {{ portfolioValue.toFixed(2) }}
              </h1>
              <h2 class="subtitle is-6">Cash balance</h2>
              <h1 class="title is-2">
                <span class="title is-4">$</span>
                {{ cashValue.toFixed(2) }}
              </h1>
              <div class="buttons">
                <router-link
                  :to="`cash/add`"
                  class="button is-primary is-outlined is-inverted is-large"
                  tabindex="0"
                >Add cash</router-link>
                <router-link
                  :to="`cash/withdraw`"
                  class="button is-danger is-outlined is-inverted is-large"
                  v-if="cashValue"
                  tabindex="0"
                >Withdraw cash</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-spaced">No-Brainer Portfolio</h1>
        <p class="subtitle">A lazy portfolio for beginners who want to invest long-term.</p>

        <article class="message is-info">
          <div
            class="message-body"
          >Put equal parts of your money into each of these stocks. That's literally it.</div>
        </article>
        <div class="columns">
          <div class="column" v-for="(stock, symbol) in portfolio" :key="symbol">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ symbol }}</p>
              </header>
              <div class="card-content">
                <p class="subtitle">
                  Current price:
                  <b>${{ stock.currValue }}</b>
                </p>
                <p class="subtitle">
                  Shares owned:
                  <b>{{ stock.quantity }}</b>
                </p>
                <p class="subtitle">
                  Current value:
                  <b class="has-text-primary">${{ stock.quantity * stock.currValue }}</b>
                </p>
              </div>
              <footer class="card-footer">
                <router-link
                  v-if="stock.quantity"
                  :to="`stocks/${symbol}/sell`"
                  class="card-footer-item has-text-danger"
                  tabindex="0"
                >Sell</router-link>
                <router-link
                  v-if="cashValue"
                  :to="`stocks/${symbol}/buy`"
                  class="card-footer-item has-text-primary"
                  tabindex="0"
                >Buy</router-link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState({
    cashValue: state => state.cashValue,
    portfolio: state => state.portfolio,
    portfolioValue: function() {
      let total = 0;
      for (let symbol in this.portfolio) {
        let stock = this.portfolio[symbol];
        total += stock.quantity * stock.currValue;
      }
      return total;
    },
    totalAssetValue: function() {
      return this.cashValue + this.portfolioValue;
    }
  }),
  beforeMount() {
    this.$store.dispatch("loadCashValue");
    this.$store.dispatch("loadPortfolio");
  }
};
</script>
