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
//import { useAuthStore } from 'src/stores/authStore';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import authService from 'src/services/AuthService';

const loginProp = reactive({
  username: '',
  password: '',
});

//const authStore = useAuthStore();
const router = useRouter();

async function execLogin() {
  //const isAuth = await authStore.login(loginProp.username, loginProp.password);
  const isAuth = await authService.login(
    loginProp.username,
    loginProp.password
  );
  if (isAuth) {
    //location.href = '/';
    router.push('/'); //logine tekrar gelip pathten login kısmını silip enter a basınca doğru şifreyle bile girsen açılmıyor
    //store değişmediği için sıkıntı çıkıyordu, storu kullanmayı bıraktım
  }
}

async function execLogout() {
  //await authStore.logout();
  await authService.logout();
}

onMounted(() => {
  //if (doLogout.value) {
  console.log('sıfırlandı');
  execLogout();
  //}
});
</script>

<style scoped></style>
