<template>
  <q-btn
    :label="adimLabel"
    color="primary"
    draggable="true"
    :style="{ position: 'absolute', top: y + 'px', left: x + 'px' }"
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
import { ref, watch } from 'vue';

interface Props {
  id: number;
  label: string;
  x: number;
  y: number;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (
    e: 'drag-start',
    payload: { id: number; offsetX: number; offsetY: number }
  ): void;
}>();

// --- drag ---
const onDragStart = (event: DragEvent) => {
  const el = event.target as HTMLElement | null;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  event.dataTransfer?.setData('drag-id', String(props.id));
  event.dataTransfer?.setData('offset-x', String(offsetX));
  event.dataTransfer?.setData('offset-y', String(offsetY));

  emit('drag-start', { id: props.id, offsetX, offsetY });
};

// --- adım state ---
const akisAdimTip = ref<string | null>(null);
const optionsAkisAdimTip = ['Kişi', 'Rol', 'Birim'];

const atanacakKullanicilar = ref<string[]>([]);
const optionsAtanacakKullanicilar = [
  'Ahmet Talha Çankal',
  'Erkan Feyyaz Yerdurmaz',
  'İbrahim Caner Karataş',
  'Mehmet Talha Kara',
  'Melih Can Kılıç',
];

const akisAdimHedefTip = ref<string | null>(null);
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

// --- label ---
const adimLabel = ref('Yeni Adım');
const getAdimLabel = () => {
  if (akisAdimTip.value === 'Kişi') {
    if (atanacakKullanicilar.value?.length) {
      let totalComplete = '';
      atanacakKullanicilar.value.forEach((el, idx) => {
        let maxShowingName = 1;
        if (idx < maxShowingName) {
          totalComplete += el;
          if (atanacakKullanicilar.value.length - 1 != idx) {
            totalComplete += ', ';
          }
        } else if (idx == maxShowingName) {
          totalComplete += '...';
        }
      });
      return totalComplete || 'Kişi Seçilmemiş';
    } else {
      return 'Kişi Seçilmemiş';
    }
  }
  return 'Birim veya Rol' + props.id;
};

// İlk değer hesapla
adimLabel.value = getAdimLabel();

// Watchers
watch(akisAdimTip, (yeniAdimTip, eskiAdimTip) => {
  console.log('watch akisAdimTip', yeniAdimTip, eskiAdimTip);
  adimLabel.value = getAdimLabel();
});
watch(atanacakKullanicilar, (yeniVal, eskiVal) => {
  console.log('watch atanacakKullanicilar', yeniVal, eskiVal);
  adimLabel.value = getAdimLabel();
});
</script>
