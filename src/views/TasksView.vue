<template>
  <div class="tasks-view">
    <div class="header">
      <h1 class="title">Görev Listeleme Sayfası</h1>
      <div class="btn">
        <q-btn label="Görev Oluştur" @click="showCreateUser = true" />
      </div>
    </div>
    <q-table title="Görevler" :columns="columns" :rows="rows" />

    <q-dialog class="dialog" v-model="showCreateUser">
      <q-card class="bg-white" style="height: 50vh; width: 50vw; padding: 10px; padding-bottom: 50px;">
        <q-card-section>
          <q-form class="form" @submit.prevent="addTask">
            <h2 class="title">Görev Oluştur</h2>
            <div class="column">
              <div class="row">
                <q-option-group v-model="browserTaskClass.browserRunType" inline
                  :options="[{ value: 'like', label: 'Beğeni' }, { value: 'rt', label: 'RT' }, { value: 'like-rt', label: 'Beğeni & RT' }]"
                  color="primary" />
              </div>
              <div class="row q-pl-sm">
                <q-input label="Kullanılacak Kullanıcı Sayısı" v-model.number="browserTaskClass.userCount" type="number"
                  style="width: 100%;" />
              </div>
            </div>
            <div class="row q-pt-sm">
              <q-btn type="submit" class="full-width">Görevi Oluşur</q-btn>
              <q-btn @click="addTweet" class="full-width">Tweet Ekle</q-btn>
            </div>
            <div class="column q-pl-sm">
              <template v-for="tweet, i  in browserTaskClass.tweets" :key="i">
                <div class="row">
                  <q-input v-model="tweet.username" type="text" label="Kullanıcı Adı" class="full-width"
                    :rules="[val => val && val.length > 0 || 'Doldurulması Zorunlu']" />
                  <q-input v-model="tweet.tweetId" type="text" label="Tweet ID" class="full-width"
                    :rules="[val => val && val.length > 0 || 'Doldurulması Zorunlu']" />
                </div>
              </template>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TweetClass } from "@/types/twitter"
import { BrowserTaskClass } from '@/types/browser';
import { addDocument, collectionListener } from '@/services/firebase/Firestore';
import { Unsubscribe } from 'firebase/firestore';
export default defineComponent({
  data() {
    return {
      showCreateUser: false,
      browserTaskClass: new BrowserTaskClass(),
      listener: null as Unsubscribe | null,
      columns: [
        { name: 'tID', label: 'ID', field: 'tID' },
        { name: 'uCount', label: 'Kullanıcı Sayısı', field: 'userCount', sortable: true },
        { name: 'runType', label: 'Görev Türü', field: 'browserRunType', sortable: true },
        { name: 'twets', label: 'Tweet Sayısı', field: 'tweetslength' },
      ],
      rows: [] as object[]
    }
  },
  methods: {
    addTweet() {
      this.browserTaskClass.tweets.push(new TweetClass())
    },
    addTask() {
      if (this.browserTaskClass.tweets.length != 0) {
        addDocument.pLogger("tasks", this.browserTaskClass).then(() => {
          this.showCreateUser = false;
        })
        this.browserTaskClass = new BrowserTaskClass()
      }
    }
  },
  mounted() {
    this.listener = collectionListener("tasks", (querySnapshot) => {
      if (!querySnapshot.empty) {
        this.rows = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return { tID: doc.id, ...data, tweetslength: Object.keys(data.tweets).length }
        })
      }
    })
  },
  unmounted() {
    if (this.listener) this.listener()
  },
  watch: {
    showCreateUser() {
      this.browserTaskClass.tweets = []
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