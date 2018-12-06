<template>
  <FormPage>
    <h1 class="title">Make a withdrawal</h1>
    <h2 class="subtitle">
      Your current cash balance is
      <b>${{ cashValue.toFixed(2) }}</b>
    </h2>

    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="transferAmount"
          class="input is-large"
          type="number"
          placeholder="Enter amount"
          min="0.00"
          :max="cashValue"
          step="0.01"
          ref="transfer"
        >
        <span class="icon is-large is-left">$</span>
      </p>
    </div>

    <div class="field" :class="[transferAmount > 0? '': 'is-invisible']">
      <p class="subtitle">
        You want to withdraw
        <b>${{ parseFloat(transferAmount).toFixed(2) }}</b> from your Bonsai cash balance
      </p>
      <a
        class="button is-large is-inverted is-outlined is-primary"
        @click="transferCash"
        @keyup.enter="transferCash"
        role="button"
        tabindex="0"
        ref="confirm"
      >Confirm</a>
    </div>
  </FormPage>
</template>

<script>
import { mapState } from "vuex";
import FormPage from "@/components/FormPage";

export default {
  name: "CashWithdraw",
  components: { FormPage },
  data() {
    return { transferAmount: "" };
  },
  computed: mapState({
    cashValue: state => state.cashValue
  }),
  beforeMount() {
    this.$store.dispatch("loadCashValue");
  },
  mounted() {
    this.$refs.transfer.focus();
  },
  methods: {
    transferCash() {
      let confirmButton = this.$refs.confirm;
      confirmButton.classList.add("is-loading");
      this.$store
        .dispatch("transferCash", -1 * parseFloat(this.transferAmount))
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
