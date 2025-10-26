import { AkisAdim } from 'src/models/models_from_backend/models';
import api from './ApiService';

const getAkisAdimRandom = async (): Promise<AkisAdim | null> => {
  let response = null;
  await api.get('/test/getAkisAdimRandom', {}).then((resp) => {
    response = resp;
  });
  return response;
};

const TestService = () => {
  return { getAkisAdimRandom };
};

export default TestService;
