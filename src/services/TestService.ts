import axios from 'axios';
import { AkisAdim } from 'src/models/models_from_backend/models';

const url = 'http://localhost:8082/api/test';

const getAkisAdimRandom = async (): Promise<AkisAdim | null> => {
  let response = null;
  await axios.get(url + '/getAkisAdimRandom', {}).then((resp) => {
    response = resp;
  });
  return response;
};

const TestService = () => {
  return { getAkisAdimRandom };
};

export default TestService;
