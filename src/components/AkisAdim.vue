<template>
  <q-page padding>
    <div class="q-pa-md">
      <div ref="playground" class="playground" @dragover.prevent @drop="onDrop">
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
          @dragstart="onDragStart"
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
                  <q-badge color="teal">
                    Tarih: {{ adimHedefTipTarih }}
                  </q-badge>
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
                        <q-btn
                          label="Cancel"
                          color="primary"
                          flat
                          v-close-popup
                        />
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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

const playground = ref<HTMLDivElement | null>(null);
const position = ref({ x: 50, y: 50 }); // Başlangıç konumu
const offset = ref({ x: 0, y: 0 });

const onDragStart = (event: DragEvent) => {
  if (!event.target) return;

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onDrop = (event: DragEvent) => {
  if (!playground.value) return;

  const containerRect = playground.value.getBoundingClientRect();

  position.value = {
    x: event.clientX - containerRect.left - offset.value.x,
    y: event.clientY - containerRect.top - offset.value.y,
  };
};
</script>

<style scoped>
.playground {
  width: 100%;
  height: 500px;
  border: 2px dashed #aaa;
  position: relative;
  overflow: hidden;
}
</style>
