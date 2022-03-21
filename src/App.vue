<template>
<authenticator>
  <template v-slot="{ user, signOut }">
    <h3>Current Login: {{ user.attributes.email }}</h3>
  <nav>
    <router-link to="/tasks">Tasks</router-link> |
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
</template>
<script>
import { Authenticator } from "@aws-amplify/ui-vue";
export default {

  components: {
    Authenticator,
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
