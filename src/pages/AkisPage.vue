<template>
  <div>
    <h1>Akış Oluşturma Sayfası</h1>
    <q-btn>Akış Oluştur</q-btn>
  </div>

  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        standout
        v-model="modelAdimTipi"
        :options="optionsAdimTipi"
        label="Adım Tipi"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelAdimTipi = ref(null);
const optionsAdimTipi = ['Kişi', 'Rol', 'Birim', 'Üst Birim', 'Generic'];
</script>
