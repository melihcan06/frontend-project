<template>
  <q-btn
    push
    color="primary"
    :label="adimLabel"
    draggable="true"
    :style="{
      position: 'absolute',
      top: position.y + 'px',
      left: position.x + 'px',
    }"
    @dragstart="PositionsService().onDragStart"
  >
    <q-popup-proxy>
      <q-banner>
        İş Akış Adım
        <q-select
          standout
          v-model="akisAdimTip"
          :options="optionsAkisAdimTip"
          label="Adım Türü"
        />
        <q-select
          standout
          v-model="atanacakKullanicilar"
          :options="optionsAtanacakKullanicilar"
          label="Kişi / Kişiler"
          multiple
          behavior="dialog"
        />
        <q-select
          standout
          v-model="akisAdimHedefTip"
          :options="optionsAkisAdimHedefTip"
          label="İş Atama Şekli"
        />
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
      </q-banner>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import PositionsService from 'src/services/PositionsService';
import { ref, watch } from 'vue';

const props = defineProps(['id']);
const id = ref(props.id);

const positions = PositionsService().positions.value;
const components = PositionsService().components.value;
var idx = 0;
if (positions != undefined) {
  for (var i = 0; i < components?.length; i++) {
    if (id.value === components[i]) {
      idx = i;
      break;
    }
  }
}
const position =
  positions != undefined
    ? positions[idx]
    : PositionsService().defaultStartPosition;

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

const atanacakKullanicilar = ref<string[]>();
const optionsAtanacakKullanicilar = [
  'Ahmet Talha Çankal',
  'Erkan Feyyaz Yerdurmaz',
  'İbrahim Caner Karataş',
  'Mehmet Talha Kara',
  'Melih Can Kılıç',
];

const adimLabel = ref('Yeni Adım');
const getAdimLabel = () => {
  if (akisAdimTip.value === 'Kişi') {
    if (
      atanacakKullanicilar.value != null && //libutil list is not empty fonk. yap!
      atanacakKullanicilar.value[0] != undefined
    ) {
      const totalComplete = ref('');
      atanacakKullanicilar.value.forEach((el, idx) => {
        if (idx < 2) {
          totalComplete.value += el + ', ';
        }
      });
      return totalComplete.value;
    } else {
      return 'Kişi Seçilmemiş';
    }
  } else {
    return 'Birim veya Rol';
  }
};
watch(akisAdimTip, (eskiAdimTip, yeniAdimTip) => {
  console.log('watch akisAdimTip');
  console.log(eskiAdimTip, yeniAdimTip);
  adimLabel.value = getAdimLabel();
});
watch(
  atanacakKullanicilar,
  (eskiAtanacakKullanicilar, yeniAtanacakKullanicilar) => {
    console.log('watch atanacakKullanicilar');
    console.log(eskiAtanacakKullanicilar, yeniAtanacakKullanicilar);
    adimLabel.value = getAdimLabel();
  }
);
</script>
