<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h2 class="subtitle is-3">Portfolio value</h2>
              <h1 class="title is-1">
                <span class="title is-3">$</span>
                {{ portfolioValue.toFixed(2) }}
              </h1>
              <h3 class="subtitle is-5">(based on current stock prices)</h3>

              <h2 class="subtitle is-5">Total asset value</h2>
              <h1 class="title is-3">
                <span class="title is-5">$</span>
                {{ totalAssetValue.toFixed(2) }}
              </h1>
            </div>
            <div class="column">
              <h2 class="subtitle is-5">Cash balance</h2>
              <h1 class="title is-3">
                <span class="title is-5">$</span>
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
      <div class="container" v-if="cashValue">
        <h1 class="title is-spaced">Your Portfolio: The No-Brainer</h1>
        <p class="subtitle">A lazy portfolio for beginners who want to invest long-term.</p>

        <article class="message is-info">
          <div
            class="message-body"
          >Put equal parts of your money into each of these. That's literally it.</div>
        </article>
        <div class="columns">
          <div class="column" v-for="(stock, symbol) in portfolio" :key="symbol">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ symbol }}</p>
              </header>
              <div class="card-content">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Current price</p>
                      <p class="title">${{ stock.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Shares owned</p>
                      <p class="title">{{ stock.quantity }}</p>
                    </div>
                  </div>
                </div>
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Current value</p>
                      <p
                        class="title has-text-primary"
                      >${{ (stock.quantity * stock.price).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <router-link
                  v-if="stock.quantity"
                  :to="`stock/sell/${symbol}`"
                  class="card-footer-item has-text-danger"
                  tabindex="0"
                >Sell</router-link>
                <router-link
                  v-if="cashValue"
                  :to="`stock/buy/${symbol}`"
                  class="card-footer-item has-text-primary"
                  tabindex="0"
                >Buy</router-link>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <h1 class="title is-spaced">Your Portfolio: The No-Brainer</h1>
        <p class="subtitle">A lazy portfolio for beginners who want to invest long-term.</p>

        <article class="message is-info">
          <div class="message-body">
            <router-link :to="`cash/add`" tabindex="0">Add some cash</router-link>
            <!---->
            to begin investing! Start with as little as $500.
          </div>
        </article>
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
    portfolioValue(state) {
      let total = 0;
      for (let symbol in state.portfolio) {
        let stock = state.portfolio[symbol];
        total += stock.quantity * stock.price;
      }
      return total;
    },
    totalAssetValue() {
      return this.cashValue + this.portfolioValue;
    }
  }),
  beforeMount() {
    this.$store.dispatch("loadCashValue");
    this.$store.dispatch("loadPortfolio");
  }
};
</script>
