<template>
  <div>
    <h1>Akış Oluşturma Sayfası</h1>
    <q-btn>Akış Oluştur</q-btn>
  </div>

  <q-page class="q-pa-md">
    <q-btn
      label="Yeni Component Ekle"
      color="primary"
      @click="addComponent"
      class="q-mb-md"
    />

    <q-page padding>
      <div class="q-pa-md">
        <div
          class="playground"
          :ref="PositionsService().playground"
          @dragover.prevent
          @drop="PositionsService().onDrop"
        >
          <div class="row q-col-gutter-md">
            <div
              v-for="adim in PositionsService().adimlar.value"
              :key="adim.id"
              class="col-12 col-md-4"
            >
              <div>
                <AkisAdim :adim="adim" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page>
</template>

<script setup lang="ts">
import AkisAdim from 'src/components/AkisAdim.vue';
import PositionsService from 'src/services/PositionsService';

function addComponent() {
  PositionsService().adimlar.value.push(PositionsService().defaultStartAdim);
}
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
