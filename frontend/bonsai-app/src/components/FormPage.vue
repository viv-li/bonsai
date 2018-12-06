<template>
  <section class="hero is-primary is-fullheight">
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item title is-4">
          <span class="icon">
            <i class="fas fa-chevron-left"></i>
          </span>&nbsp;&nbsp;Home
        </router-link>
      </div>
    </nav>
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
