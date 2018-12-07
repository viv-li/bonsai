<template>
  <FormPage>
    <h1 class="title">Sell {{ symbol }}</h1>
    <h2 class="subtitle">
      Current price:
      <b>${{ currentStockPrice.toFixed(2) }}</b>
    </h2>

    <div class="field">
      <p class="control">
        <input
          v-model="transferAmount"
          class="input is-large"
          type="number"
          placeholder="Enter number of shares"
          min="0"
          :max="heldShares"
          step="1"
          ref="transfer"
        >
      </p>
    </div>

    <div class="field" :class="[transferAmount > 0? '': 'is-invisible']">
      <p class="subtitle is-spaced">
        You want to sell
        <b>{{ parseInt(transferAmount) }}</b> shares of
        <b>{{ symbol }}</b>
        at
        <b>${{ currentStockPrice }}</b> per share
      </p>
      <p class="title">
        Total sale price:
        <b>${{ parseFloat(totalPrice).toFixed(2) }}</b>
      </p>
      <article class="message is-danger" v-if="!hasEnoughShares">
        <div
          class="message-body"
        >You don't have that many to sell! You currently hold {{ heldShares }} shares of {{ symbol }}.</div>
      </article>
      <a
        class="button is-large is-inverted is-outlined is-primary"
        @click="transferStock"
        @keyup.enter="transferStock"
        role="button"
        tabindex="0"
        ref="confirm"
        :disabled="!hasEnoughShares"
      >Confirm</a>
    </div>
  </FormPage>
</template>

<script>
import { mapState } from "vuex";
import FormPage from "@/components/FormPage";

export default {
  name: "StockSell",
  components: { FormPage },
  data() {
    return {
      transferAmount: "",
      symbol: this.$route.params.symbol
    };
  },
  computed: mapState({
    portfolio: state => state.portfolio,
    heldShares(state) {
      let stock = state.portfolio[this.symbol];
      return stock.quantity;
    },
    currentStockPrice(state) {
      return state.portfolio[this.symbol].price;
    },
    totalPrice() {
      return this.transferAmount * this.currentStockPrice;
    },
    hasEnoughShares() {
      return this.transferAmount <= this.heldShares;
    }
  }),
  beforeMount() {
    this.$store.dispatch("loadPortfolio");
  },
  mounted() {
    this.$refs.transfer.focus();
  },
  methods: {
    transferStock() {
      let confirmButton = this.$refs.confirm;
      confirmButton.classList.add("is-loading");

      this.$store
        .dispatch("transferStock", {
          symbol: this.symbol,
          amount: { transferAmount: -1 * parseFloat(this.transferAmount) }
        })
        .then(
          () => {
            confirmButton.innerHTML = "<i class='fas fa-check'></i>&nbsp;Done";
            confirmButton.classList.remove("is-loading");
            setTimeout(() => {
              this.$router.push("/");
            }, 300);
          },
          () => {
            confirmButton.innerHTML = "Something went wrong :(";
            confirmButton.classList.remove("is-loading");
            setTimeout(() => {
              confirmButton.innerHTML = "Confirm";
              confirmButton.blur();
            }, 3000);
          }
        );
    }
  }
};
</script>

<style scoped lang="scss">
</style>
