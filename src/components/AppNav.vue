<template>
  <b-navbar class="nav has-shadow is-dark" :fixed-top="true">
    <template slot="brand">
      <b-navbar-item>Vue TS</b-navbar-item>
    </template>

    <template slot="start"> 
        <b-navbar-item id="nav-item" tag="router-link" :to="{path: '/home' }">Home</b-navbar-item>
        <b-navbar-item id="nav-item" tag="router-link" :to="{path: '/categories' }">Categories</b-navbar-item>
        <b-navbar-item id="nav-item" tag="router-link" :to="{path: '/random' }">Random</b-navbar-item>
        <b-navbar-item id="nav-item" tag="router-link" :to="{path: '/about' }">About</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppNav extends Vue {
}
</script>

<style scoped lang="scss">
#nav a {
  color: #dddddd;
}

.navbar a.router-link {
  color: whitesmoke;
}

// .navbar-menu {
//   margin-left: auto;
// }

#nav-item.router-link-active {
  color: #42b883;
}

.nav {
  height: 7vh;
}

.container {
  width: 50vw;
}

.field {
  padding-right: 10px;
  padding-top: 7px;
}
</style>