<template>
  <q-page padding>
    <div class="q-mb-md row q-gutter-sm">
      <q-btn label="Yeni Adım Ekle" color="secondary" @click="addButton" />
      <q-btn
        :color="connectMode ? 'negative' : 'primary'"
        :label="connectMode ? 'Bağlantı Modu: Açık' : 'Bağlantı Modu: Kapalı'"
        @click="toggleConnectMode"
      />
    </div>

    <div ref="playground" class="playground" @dragover.prevent @drop="onDrop">
      <!-- SVG layer -->
      <svg class="connections">
        <line
          v-for="(line, idx) in lines"
          :key="idx"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :stroke="line.id === selectedConnection?.id ? 'red' : 'black'"
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
      <AkisAdimCmp
        v-for="btn in buttons"
        :key="btn.id"
        :id="btn.id"
        :label="btn.label"
        :x="btn.x"
        :y="btn.y"
        @click="onButtonClick(btn)"
        @drag-start="onChildDragStart"
        @update-label="onUpdateLabel"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import AkisAdimCmp from 'src/components/AkisAdimCmp.vue';
import { ButtonItem } from 'src/models/ButtonItem';
import { ILine } from 'src/models/ILine';
import { AkisAdim } from 'src/models/models_from_backend/models';
import AkisService from 'src/services/AkisService';

const playground = ref<HTMLDivElement | null>(null);
const buttons = ref<ButtonItem[]>([]);

// --- LocalStorage ---
/*const saved = localStorage.getItem('akisButtons');
if (saved) {
  buttons.value = JSON.parse(saved);
}*/
//test
buttons.value = JSON.parse(
  '[{ "id": 1, "label": "Adım 1", "x": 600, "y": 25, "connections": [2] },{ "id": 2, "label": "Adım 2", "x": 300, "y": 225, "connections": [3] },{ "id": 3, "label": "Adım 3", "x": 900, "y": 225, "connections": [1] }]'
);

const { getSiradakiAdimNoBaslangic } = AkisService();
let counter = getSiradakiAdimNoBaslangic(buttons.value);

watch(
  buttons,
  (val) => {
    localStorage.setItem('akisButtons', JSON.stringify(val));
  },
  { deep: true }
);

// --- Drag State ---
const dragging = ref<{ id: number | null; offsetX: number; offsetY: number }>({
  id: null,
  offsetX: 0,
  offsetY: 0,
});

// --- Connection Mode ---
const connectMode = ref(false);
const selectedForConnect = ref<number | null>(null);

const toggleConnectMode = () => {
  connectMode.value = !connectMode.value;
  selectedForConnect.value = null;
};

// --- Seçili Connection ---
const selectedConnection = ref<ILine | null>(null);

const selectConnection = (line: ILine) => {
  selectedConnection.value =
    selectedConnection.value?.id === line.id ? null : line;
};

// --- Delete tuşu ile silme ---
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Delete' && selectedConnection.value) {
    const from = buttons.value.find(
      (b) => b.id === selectedConnection.value?.from
    );
    if (from) {
      from.connections = from.connections.filter(
        (c) => c !== selectedConnection.value?.to
      );
    }
    selectedConnection.value = null;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// --- Add Button ---
const addButton = () => {
  var temp2 = <AkisAdim>{
    adimNo: counter,
  };
  console.log(temp2);
  debugger;

  var temp = <ButtonItem>{
    id: counter,
    label: `Adım ${counter}`,
    x: 40 + (counter - 1) * 30,
    y: 40 + (counter - 1) * 30,
    connections: [],
  };
  buttons.value.push(temp);
  counter++;
};

// --- Button Click (connection mode) ---
const onButtonClick = (btn: ButtonItem) => {
  if (!connectMode.value) return;

  if (selectedForConnect.value == null) {
    selectedForConnect.value = btn.id;
  } else {
    const from = buttons.value.find((b) => b.id === selectedForConnect.value);
    if (from && !from.connections.includes(btn.id) && from.id !== btn.id) {
      from.connections.push(btn.id);
    }
    selectedForConnect.value = null;
  }
};

// --- Drag Handlers ---
const onChildDragStart = (payload: {
  id: number;
  offsetX: number;
  offsetY: number;
}) => {
  dragging.value = {
    id: payload.id,
    offsetX: payload.offsetX,
    offsetY: payload.offsetY,
  };
};

const onDrop = (event: DragEvent) => {
  if (!playground.value) return;
  const rect = playground.value.getBoundingClientRect();

  const idStr = event.dataTransfer?.getData('drag-id');
  const id = idStr ? Number(idStr) : dragging.value.id;
  if (id == null) return;

  const offsetX =
    Number(event.dataTransfer?.getData('offset-x')) || dragging.value.offsetX;
  const offsetY =
    Number(event.dataTransfer?.getData('offset-y')) || dragging.value.offsetY;

  const dropX = event.clientX - rect.left - offsetX;
  const dropY = event.clientY - rect.top - offsetY;

  const btnWidth = 120;
  const btnHeight = 40;

  const idx = buttons.value.findIndex((b) => b.id === id);
  if (idx !== -1) {
    buttons.value[idx].x = Math.max(0, Math.min(dropX, rect.width - btnWidth));
    buttons.value[idx].y = Math.max(
      0,
      Math.min(dropY, rect.height - btnHeight)
    );
  }

  dragging.value = { id: null, offsetX: 0, offsetY: 0 };
};

// --- Label Update ---
const onUpdateLabel = (payload: { id: number; label: string }) => {
  const idx = buttons.value.findIndex((b) => b.id === payload.id);
  if (idx !== -1) {
    buttons.value[idx].label = payload.label;
  }
};

// --- Çizgiler ---
const lines = computed<ILine[]>(() => {
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
});
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
