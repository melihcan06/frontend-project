<template>
  <q-page padding>
    <div class="q-mb-md row q-gutter-sm">
      <q-btn label="TEST" color="secondary" @click="test" />
      <q-btn label="Temizle TEST" color="secondary" @click="temizleTest" />
      <q-btn label="Yeni Adım Ekle" color="primary" @click="yeniAdimEkle" />
      <q-btn
        :color="connectMode ? 'negative' : 'primary'"
        :label="connectMode ? 'Bağlantı Modu: Açık' : 'Bağlantı Modu: Kapalı'"
        @click="toggleConnectMode"
      />
      <q-btn label="Kaydet" color="primary" @click="akisKaydet" />
    </div>

    <div ref="playground" class="playground" @dragover.prevent @drop="onDrop">
      <!--  -->
      <!-- SVG layer -->
      <svg class="connections">
        <line
          v-for="(line, idx) in akis?.listAkisBag"
          :key="idx"
          :x1="getBagKonum(akis, line).x1"
          :y1="getBagKonum(akis, line).y1"
          :x2="getBagKonum(akis, line).x2"
          :y2="getBagKonum(akis, line).y2"
          :stroke="
            selectedConnection && line.id === selectedConnection?.id
              ? 'red'
              : 'black'
          "
          stroke-width="2"
          marker-end="url(#arrowhead)"
          @click="selectConnection(line)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
      </svg>

      <!-- Butonlar -->
      <AkisAdimComp
        v-for="btn in akis?.listAkisAdim"
        :key="btn.id"
        :adim="btn"
        @click="onButtonClick(btn)"
        @drag-start="onChildDragStart"
      />
      <!--
        @update-label="onUpdateLabel" -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AkisAdimComp from 'src/components/AkisAdimComp.vue';
import AkisService from 'src/services/AkisService';
import AkisPageService from 'src/services/AkisPageService';
import {
  AkisAdim,
  AkisBag,
  AkisDto,
} from 'src/models/models_from_backend/models';
import { IDragRef } from 'src/models/IDragRef';

const {
  createAkisDto,
  getAkisByAkisNo,
  saveAkis,
  getBagKonum,
  akisAdimEkle,
  akisBagEkle,
} = AkisService();
const { connectMode } = AkisPageService();
const playground = ref<HTMLDivElement | null>(null);
const akis = ref<AkisDto>(); //AkisService e mi alsak ?
akis.value = createAkisDto();

const test = async () => {
  akis.value = await getAkisByAkisNo(1);
};

const temizleTest = () => {
  akis.value = createAkisDto();
};

// --- Add Button ---
const yeniAdimEkle = () => {
  if (!akis.value) {
    return; //TODO
  }
  akisAdimEkle(akis.value);
};

const akisKaydet = () => {
  if (!akis.value) {
    return; //TODO
  }
  saveAkis(akis.value).then((resp) => (akis.value = resp));
};

// --- Drag State ---
const dragging = ref<IDragRef>({
  adimNo: -1,
  offsetX: 0,
  offsetY: 0,
});

// --- Connection Mode ---
const selectedForConnectAdimNo = ref<number | null>(null);

const toggleConnectMode = () => {
  connectMode.value = !connectMode.value;
  selectedForConnectAdimNo.value = null;
};

// --- Seçili Connection ---
const selectedConnection = ref<AkisBag | null>(null);

const selectConnection = (line: AkisBag) => {
  selectedConnection.value =
    selectedConnection.value?.id === line.id ? null : line;
};

// --- Delete tuşu ile silme ---
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Delete' && selectedConnection.value && akis.value) {
    akis.value.listAkisBag = akis.value.listAkisBag.filter(
      (b) => b.id != selectedConnection.value?.id
    );
    selectedConnection.value = null;
  }
};

// --- Button Click (connection mode) ---
const onButtonClick = (btn: AkisAdim) => {
  if (!connectMode.value) return;
  if (!akis.value) return;

  if (selectedForConnectAdimNo.value == null) {
    selectedForConnectAdimNo.value = btn.adimNo;
  } else if (selectedForConnectAdimNo.value != btn.adimNo) {
    akisBagEkle(akis.value, selectedForConnectAdimNo.value, btn.adimNo);
    selectedForConnectAdimNo.value = null;
  }
};

// --- Drag Handlers ---
const onChildDragStart = (payload: IDragRef) => {
  dragging.value = <IDragRef>{
    adimNo: payload.adimNo,
    offsetX: payload.offsetX,
    offsetY: payload.offsetY,
  };
};

const onDrop = (event: DragEvent) => {
  if (!playground.value) return;
  const rect = playground.value.getBoundingClientRect();

  const idStr = event.dataTransfer?.getData('drag-adimNo');
  const adimNo = idStr ? Number(idStr) : dragging.value.adimNo;
  if (adimNo == -1) return;

  const offsetX =
    Number(event.dataTransfer?.getData('offset-x')) || dragging.value.offsetX;
  const offsetY =
    Number(event.dataTransfer?.getData('offset-y')) || dragging.value.offsetY;

  const dropX = event.clientX - rect.left - offsetX;
  const dropY = event.clientY - rect.top - offsetY;

  const btnWidth = 120;
  const btnHeight = 40;

  if (!akis.value) {
    return;
  }

  const idx = akis.value.listAkisAdim.findIndex((b) => b.adimNo === adimNo);
  if (idx !== -1) {
    akis.value.listAkisAdim[idx].x = Math.max(
      0,
      Math.min(dropX, rect.width - btnWidth)
    );
    akis.value.listAkisAdim[idx].y = Math.max(
      0,
      Math.min(dropY, rect.height - btnHeight)
    );
  }

  dragging.value = { adimNo: -1, offsetX: 0, offsetY: 0 };
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

/*const saved = localStorage.getItem('akis');
if (saved) {
  akis.value = JSON.parse(saved);
}

watch(
  akis,
  (val) => {
    localStorage.setItem('akis', JSON.stringify(val));
  },
  { deep: true }
);*/

// --- Label Update ---
/*const onUpdateLabel = (payload: { id: number; label: string }) => {
  const idx = buttons.value.findIndex((b) => b.id === payload.id);
  if (idx !== -1) {
    buttons.value[idx].label = payload.label;
  }
};*/

// --- Çizgiler ---
/*const lines = computed<ILine[]>(() => {
  const arr: ILine[] = [];
  buttons.value.forEach((from) => {
    const fromX = from.x + 60;
    const fromY = from.y + 20;
    from.connections.forEach((toId) => {
      const to = buttons.value.find((b) => b.id === toId);
      if (to) {
        const toX = to.x + 60;
        const toY = to.y + 20;
        arr.push({
          id: `${from.id}-${to.id}`,
          from: from.id,
          to: to.id,
          x1: fromX,
          y1: fromY,
          x2: toX,
          y2: toY,
        });
      }
    });
  });
  return arr;
});*/
</script>

<style scoped>
.playground {
  width: 100%;
  height: 500px;
  border: 2px dashed #aaa;
  position: relative;
  overflow: hidden;
}

.connections {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
