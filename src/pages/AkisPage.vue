<template>
  <div>
    <h1>Akış Oluşturma Sayfası</h1>
    <q-btn>Akış Oluştur</q-btn>
  </div>

  <q-page class="q-pa-md">
    <q-btn
      label="Yeni Component Ekle"
      color="primary"
      @click="addComponent"
      class="q-mb-md"
    />

    <div class="row q-col-gutter-md">
      <div v-for="id in components" :key="id" class="col-12 col-md-4">
        <MyComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyComponent from 'src/components/AkisAdim.vue';

// component sayısını tutuyoruz
const components = ref<number[]>([]);

function addComponent() {
  components.value.push(Date.now()); // benzersiz key için timestamp
}
</script>
