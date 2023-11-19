<template>
  <div class="login-view">
    <h1 class="title">
      Twiter Bot Kontol Sistemi
    </h1>
    <div class="content">
      <h2 class="title">
        Lütfen Giriş Yapınız
      </h2>
      <q-form class="form" @submit.prevent="login">
        <q-input class="input" v-model="user.name" label="Kullanıcı Adı" />
        <q-input class="input" type="password" v-model="user.password" label="Kullanıcı Şifre" />
        <q-btn class="btn" label="Giriş Yap" type="submit" />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginToAuth } from "@/services/firebase/Authentication"
export default defineComponent({
  name: "LoginView",
  data() {
    return {
      user: { name: "", password: "" }
    }
  },
  methods: {
    login() {
      if (!this.user.name || !this.user.password) return this.$q.dialog({ title: "Hata", message: "Lütfen Kullanıcı Adı ve Şifrenizi Girin" })
      loginToAuth(this.user.name, this.user.password).catch(reason => {
        console.log(reason.code)
        if (reason.code == "auth/invalid-login-credentials")
          this.$q.dialog({ title: "Hata", message: "Girilen Bilgiler Hatalı Lütfen Tekrar Deneyin" })
      })
    }
  },

})
</script>

<style scoped>
.login-view {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
}

.login-view>.title {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 7vw;
  padding-bottom: 20vh;
  font-size: 42pt;
  line-height: normal;
  background-color: violet;
  color: black;
  margin: 0;
}

.login-view .content {
  padding: 0 7vw;
  padding-bottom: 20vh;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.login-view .content .title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16pt;
  line-height: normal;
  color: black;
}

.login-view .content .form {
  width: 400px;
  border: 1px solid violet;
  padding: 20px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-view .content .form .btn {
  width: 100%;
}
</style>