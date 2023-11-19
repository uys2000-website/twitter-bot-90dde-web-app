<template>
  <div class="tasks-view">
    <div class="header">
      <h1 class="title">Twitter Kullanıcı Listeleme Sayfası</h1>
      <div class="btn">
        <q-btn label="Kullanıcılar Sil" @click="deleteUsers" />
        <q-btn label="Kullanıcı Ekle" @click="showCreateUser = true" />
      </div>
    </div>
    <q-table title="Görevler" :columns="columns" :rows="rows" selection="multiple" row-key="id"
      v-model:selected="selected" />

    <q-dialog class="dialog" v-model="showCreateUser">
      <q-card class="bg-white" style="height: 50vh; width: 50vw; padding: 10px; padding-bottom: 50px;">
        <q-card-section>
          <q-form class="form" @submit.prevent="addUser">
            <h2 class="title">Twitter Kullanıcısı Oluştur</h2>
            <q-input v-model="userClass.username" label="Kullanıcı Adı"
              :rules="[val => val && val.length > 0 || 'Doldurulması Zorunlu']" />
            <q-input v-model="userClass.usermail" label="Kullanıcı Mail"
              :rules="[val => val && val.length > 0 || 'Doldurulması Zorunlu']" />
            <q-input v-model="userClass.password" label="Kullanıcı Şifre"
              :rules="[val => val && val.length > 0 || 'Doldurulması Zorunlu']" />
            <q-btn label="Kullanıcı Ekle" type="submit" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Unsubscribe } from 'firebase/firestore';
import { UserClass } from '@/types/account';
import { addDocument, collectionListener, deleteDocument } from '@/services/firebase/Firestore';
export default defineComponent({
  data() {
    return {
      showCreateUser: false,
      userClass: new UserClass(),
      listener: null as Unsubscribe | null,
      selected: [] as { id: string }[],
      columns: [
        { name: 'username', label: 'Kullanıcı Adı', field: 'username', sortable: true },
        { name: 'usermail', label: 'Mail', field: 'usermail', sortable: true },
        { name: 'password', label: 'Şifre', field: 'password', sortable: true },
      ],
      rows: [] as object[]
    }
  },
  methods: {
    addUser() {
      addDocument("users", this.userClass).then(() => {
        this.showCreateUser = false
        this.userClass = new UserClass()
      })
    },
    deleteUsers() {
      this.selected.forEach(doc => {
        deleteDocument("users", doc.id)
      })
    }
  },
  mounted() {
    this.listener = collectionListener("users", (querySnapshot) => {
      if (!querySnapshot.empty) {
        this.rows = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }
    })
  },
  unmounted() {
    if (this.listener) this.listener()
  },
  watch: {
    showCreateUser() {
      this.userClass = new UserClass()
    }
  }
})
</script>



<style scoped>
.tasks-view {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 10px;
}

.tasks-view .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tasks-view .header h1.title {
  font-size: 36px;
  line-height: normal;
}

.tasks-view .header .btn {
  height: min-content;
  font-size: 36px;
  line-height: normal;
}

.tasks-view .header h1.title {
  font-size: 36px;
  line-height: normal;
}

.tasks-view .table {
  width: 100%;

}

.tasks h2.title {
  font-size: 28px;
  line-height: normal;
  margin-bottom: 20px;
}

.tasks h3 {
  font-size: 24px;
  border-bottom: 1px solid #000;
  margin: 10px 0;
  padding-bottom: 5px;
  line-height: normal;
}

.tasks .form {
  padding: 20px;
}

.dialog h2.title {
  font-size: 28px;
  line-height: normal;
  margin-bottom: 20px;
}

.dialog h3 {
  font-size: 24px;
  border-bottom: 1px solid #000;
  margin: 10px 0;
  padding-bottom: 5px;
  line-height: normal;
}

.dialog .form {
  padding: 20px;
}

.dialog .form .column,
.dialog .form .row {
  flex-wrap: nowrap;
  gap: 5px;
}

.dialog .form .row .input {
  width: 100%;
}
</style>