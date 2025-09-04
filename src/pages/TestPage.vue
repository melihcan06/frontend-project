<template>
  <q-page padding>
    <div class="q-mb-md">
      <q-btn label="Yeni Buton Ekle" color="secondary" @click="addButton" />
    </div>

    <div ref="playground" class="playground" @dragover.prevent @drop="onDrop">
      <DraggableButton
        v-for="btn in buttons"
        :key="btn.id"
        :id="btn.id"
        :label="btn.label"
        :x="btn.x"
        :y="btn.y"
        @drag-start="onChildDragStart"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DraggableButton from 'src/components/DraggableButton.vue';

type ButtonItem = {
  id: number;
  label: string;
  x: number;
  y: number;
};

const playground = ref<HTMLDivElement | null>(null);
const buttons = ref<ButtonItem[]>([]);
let counter = 1;

// Aktif sürüklenen butonun offset'i
const dragging = ref<{ id: number | null; offsetX: number; offsetY: number }>({
  id: null,
  offsetX: 0,
  offsetY: 0,
});

const addButton = () => {
  buttons.value.push({
    id: counter,
    label: `Buton ${counter}`,
    x: 40,
    y: 40,
  });
  counter++;
};

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

  // Container rect'i alınır (mutlak -> yerel koordinat dönüşümü)
  const rect = playground.value.getBoundingClientRect();

  // dataTransfer varsa ordan oku; yoksa child'dan gelen state'i kullan
  const idStr = event.dataTransfer?.getData('drag-id');
  const id = idStr ? Number(idStr) : dragging.value.id;
  if (id == null) return;

  const offsetX =
    Number(event.dataTransfer?.getData('offset-x')) || dragging.value.offsetX;
  const offsetY =
    Number(event.dataTransfer?.getData('offset-y')) || dragging.value.offsetY;

  const dropX = event.clientX - rect.left - offsetX;
  const dropY = event.clientY - rect.top - offsetY;

  // Hangi butonsa onun konumunu güncelle
  const idx = buttons.value.findIndex((b) => b.id === id);
  if (idx !== -1) {
    // container sınırları dışına taşmasın istersen clamp'leyebilirsin:
    buttons.value[idx].x = Math.max(0, Math.min(dropX, rect.width - 1));
    buttons.value[idx].y = Math.max(0, Math.min(dropY, rect.height - 1));
  }

  // sürükleme bitti
  dragging.value = { id: null, offsetX: 0, offsetY: 0 };
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
