<template>
  <div>
    <h1>Akış Oluşturma Sayfası</h1>
    <q-btn>Akış Oluştur</q-btn>
  </div>

  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        standout
        v-model="akisAdimTip"
        :options="optionsAkisAdimTip"
        label="Adım Tipi"
      />
      <!-- <q-input v-model="kisiHavuzu" type="text" label="Kişi Havuzu" /> -->
      <q-select
        standout
        v-model="akisAdimHedefTip"
        :options="optionsAkisAdimHedefTip"
        label="Adım Hedef Tipi"
      />
    </div>
  </div>
  <!-- <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-date v-model="date" minimal today-btn />
    </div>
  </div> -->

  <div class="q-pa-md">
    <div class="q-mb-sm">
      <q-badge color="teal"> Tarih: {{ adimHedefTipTarih }} </q-badge>
    </div>

    <q-btn icon="event" round color="primary">
      <q-popup-proxy
        @before-show="updateProxyAdimHedefTipTarih"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date v-model="proxyAdimHedefTipTarih">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="selectAdimHedefTipTarih"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const kisiHavuzu = ref(null);
const akisAdimTip = ref(null);
const optionsAkisAdimTip = ['Kişi', 'Rol', 'Birim'];
const akisAdimHedefTip = ref(null);
const optionsAkisAdimHedefTip = [
  'Tüm işlere bakarak ata',
  'Bugünün işlerine bakarak ata',
  'Özel bir tarihe bakarak ata',
  'Birime eklenen son kullanıcının eklenme tarihine bakarak ata',
];

const adimHedefTipTarih = ref('2025/09/02');
const proxyAdimHedefTipTarih = ref('2019/03/01');
const updateProxyAdimHedefTipTarih = () => {
  proxyAdimHedefTipTarih.value = adimHedefTipTarih.value;
};
const selectAdimHedefTipTarih = () => {
  adimHedefTipTarih.value = proxyAdimHedefTipTarih.value;
};
</script>
