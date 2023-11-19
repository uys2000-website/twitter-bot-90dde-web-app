<template>
  <q-drawer v-model="value" side="left" bordered>
    <q-list>
      <router-link :to="{ name: 'HomeView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="primary" name="home" />
          </q-item-section>

          <q-item-section>Ana Sayfa</q-item-section>
        </q-item>
      </router-link>

      <q-separator />

      <router-link :to="{ name: 'TasksView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="teal" name="query_stats" />
          </q-item-section>

          <q-item-section>Görevler</q-item-section>
        </q-item>
      </router-link>

      <router-link :to="{ name: 'TwitterUsersView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="purple" name="psychology" />
          </q-item-section>

          <q-item-section>Twetter Kullanıcılar</q-item-section>
        </q-item>
      </router-link>

      <router-link :to="{ name: 'UsersView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="teal" name="people" />
          </q-item-section>

          <q-item-section>Kullanıcılar</q-item-section>
        </q-item>
      </router-link>

      <router-link :to="{ name: 'LogsView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="teal" name="query_stats" />
          </q-item-section>

          <q-item-section>Loglar</q-item-section>
        </q-item>
      </router-link>

      <router-link :to="{ name: 'LogoutView' }">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="32px" color="purple" name="logout" />
          </q-item-section>
          <q-item-section>Çıkış Yap</q-item-section>
        </q-item>
      </router-link>

    </q-list>
  </q-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>