<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="execLogin" class="q-gutter-md">
      <!-- <h5>Login</h5> -->
      <q-input v-model="loginProp.username" type="text" label="Username" />
      <q-input v-model="loginProp.password" type="password" label="Passwod" />
      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { onMounted, reactive } from 'vue';

const loginProp = reactive({
  username: '',
  password: '',
});

const authStore = useAuthStore();

async function execLogin() {
  const isAuth = await authStore.login(loginProp.username, loginProp.password);
  if (isAuth) {
    location.href = '/';
  }
}

async function execLogout() {
  await authStore.logout();
}

onMounted(() => {
  //if (doLogout.value) {
  execLogout();
  //}
});
</script>

<style scoped></style>
