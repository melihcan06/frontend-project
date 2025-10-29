import { ref } from 'vue';

const connectMode = ref(false);

const AkisPageService = () => {
  return {
    connectMode,
  };
};

export default AkisPageService;
