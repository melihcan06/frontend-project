import { AkisAdim, AkisBag } from 'src/models/models_from_backend/models';
import api from './ApiService';

const getAkisAdimRandom = async (): Promise<AkisAdim | null> => {
  let response = null;
  await api.get('/test/getAkisAdimRandom', {}).then((resp) => {
    response = resp?.data;
  });
  return response;
};

const listAkisAdimByAkisNo = async (): Promise<AkisAdim[] | null> => {
  let response = null;
  await api.post('/test/listAkisAdimByAkisNo', { akisNo: 1 }).then((resp) => {
    response = resp?.data;
  });
  return response;
};

const listAkisBagByAkisNo = async (): Promise<AkisBag[] | null> => {
  let response = null;
  await api.post('/test/listAkisBagByAkisNo', { akisNo: 1 }).then((resp) => {
    response = resp?.data;
  });
  return response;
};

const TestService = () => {
  return { getAkisAdimRandom, listAkisAdimByAkisNo, listAkisBagByAkisNo };
};

export default TestService;
