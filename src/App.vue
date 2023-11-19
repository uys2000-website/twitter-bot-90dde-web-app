<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { auth } from './services/firebase/Authentication';

export default defineComponent({
  name: 'App',
  mounted() {
    auth.beforeAuthStateChanged((user) => {
      if (user) this.$router.push({ name: "HomeView" })
      else this.$router.push({ name: "LoginView" })
    })
  }
})
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: inherit;
}
</style>