<template>
  <q-page padding>
    <div ref="playground" class="playground" @dragover.prevent @drop="onDrop">
      <q-btn
        label="Sürükle Beni"
        color="primary"
        draggable="true"
        :style="{
          position: 'absolute',
          top: position.y + 'px',
          left: position.x + 'px',
        }"
        @dragstart="onDragStart"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const playground = ref(null);
const position = ref({ x: 50, y: 50 }); // Başlangıç konumu
const offset = ref({ x: 0, y: 0 });

const onDragStart = (event) => {
  const rect = event.target.getBoundingClientRect();
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onDrop = (event) => {
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
