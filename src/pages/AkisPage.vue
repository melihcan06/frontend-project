<template>
  <div>
    <h1>Akış Oluşturma Sayfası</h1>
    <q-btn>Akış Oluştur</q-btn>
  </div>

  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        standout
        v-model="modelAkisAdimTip"
        :options="optionsAkisAdimTip"
        label="Adım Tipi"
      />
      <!-- <q-input v-model="modelKisiHavuzu" type="text" label="Kişi Havuzu" /> -->
      <q-select
        standout
        v-model="modelAkisAdimHedefTip"
        :options="optionsAkisAdimHedefTip"
        label="Adım Hedef Tipi"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const modelKisiHavuzu = ref(null);
const modelAkisAdimTip = ref(null);
const optionsAkisAdimTip = ['Kişi', 'Rol', 'Birim'];
const modelAkisAdimHedefTip = ref(null);
const optionsAkisAdimHedefTip = [
  'Tüm işlere bakarak ata',
  'Bugünün işlerine bakarak ata',
  'Özel bir tarihe bakarak ata',
  'Birime eklenen son kullanıcının eklenme tarihine bakarak ata',
];
</script>
