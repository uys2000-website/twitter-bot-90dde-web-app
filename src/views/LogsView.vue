<template>
  <div class="tasks-view">
    <div class="header">
      <h1 class="title">Log Listeleme Sayfası</h1>
    </div>
    <q-table title="Görevler" :columns="columns" :rows="rows">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}

          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <template v-for="key, index in Object.keys(props.row.data)" :key="index">
              <q-field outlined :label="key" stack-label class="full-width">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ props.row.data[key] }}</div>
                </template>
              </q-field>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { collectionListener } from '@/services/firebase/Firestore';
import { Unsubscribe } from 'firebase/firestore';
export default defineComponent({
  data() {
    return {
      showCreateUser: false,
      listener: null as Unsubscribe | null,
      columns: [
        { name: 'type', label: 'Tür', field: 'type', sortable: true },
        { name: 'name', label: 'İsim', field: 'name', sortable: true },
        { name: 'id', label: 'id', field: 'id' },
      ],
      rows: [] as object[]
    }
  },
  mounted() {
    this.listener = collectionListener("logs", (querySnapshot) => {
      if (!querySnapshot.empty) {
        this.rows = querySnapshot.docs.map(doc => {
          const data = doc.data()
          const type = Object.keys(data)[0] != "timestamp" ? Object.keys(data)[0] : Object.keys(data)[1]
          return { id: doc.id, type: type, name: data[type].name, data: data[type].data }
        })
      }
    }, true)
  },
  unmounted() {
    if (this.listener) this.listener()
  },
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