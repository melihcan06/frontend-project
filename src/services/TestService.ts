import axios from 'axios';
import { AkisAdim } from 'src/models/models_from_backend/models';

const url = 'http://localhost:8080/api/test';

const getAkisAdimRandom = async (): Promise<AkisAdim | null> => {
  await axios.get(url + '/getAkisAdimRandom', {}).then((resp) => {
    return resp;
  });
  return null;
};

const TestService = () => {
  return { getAkisAdimRandom };
};

export default TestService;
