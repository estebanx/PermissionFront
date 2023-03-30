<template>
  <div id="app">
    <b-navbar fixed toggleable type="dark" variant="primary">
      <b-navbar-brand href="/">
    <img src="./assets/permission.png" width="100" height="100"/>

      </b-navbar-brand>
    </b-navbar>
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2d0ceb;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
