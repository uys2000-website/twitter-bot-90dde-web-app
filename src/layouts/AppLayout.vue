<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />

        <q-toolbar-title>
          Twitter Bot Task Kontrol Sistemi
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <drawer-comp v-model="isMenuOpen" />

    <q-page-container class="page">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DrawerComp from "@/components/shared/DrawerComp.vue"

export default defineComponent({
  components: { DrawerComp },
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleDrawer() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>