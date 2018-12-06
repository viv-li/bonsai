<template>
  <div id="app">
    <!-- <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand is-right">
        <router-link to="/" class="navbar-item" @click.native="toggleNavbarMenu">
          <img alt="Bonsai logo" src="./assets/logo.svg">
        </router-link>
      </div>
    </nav>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavbarMenuActive: false,
      cashValue: 0
    };
  },
  methods: {
    toggleNavbarMenu() {
      this.isNavbarMenuActive = !this.isNavbarMenuActive;
    }
  }
};
</script>

<style lang="scss">
$primary: hsl(175, 53%, 38%);
@import "~bulma/bulma";

#app {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
