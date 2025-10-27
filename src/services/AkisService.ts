import { ButtonItem } from 'src/models/ButtonItem';
import { AkisDto } from 'src/models/models_from_backend/models';
import api from './ApiService';

const getSiradakiAdimNoBaslangic = (buttons: ButtonItem[]) => {
  /*let counter = 0;
  buttons?.forEach((from) => {
    if (from.id > counter) {
      counter = from.id;
    }
  });
  return counter + 1;*/
  return buttons?.length + 1;
};

const adimEkle = (buttons: ButtonItem[]) => {
  let siradakiAdimNo = getSiradakiAdimNoBaslangic(buttons);
  const temp = <ButtonItem>{
    id: siradakiAdimNo,
    label: `Adım ${siradakiAdimNo}`,
    x: 40 + (siradakiAdimNo - 1) * 30,
    y: 40 + (siradakiAdimNo - 1) * 30,
    connections: [],
  };
  buttons.push(temp);
  siradakiAdimNo++;
};

const getAkisByAkisNo = async (akisNumber: number): Promise<AkisDto | null> => {
  let response = null;
  await api
    .post('/akis/getAkisByAkisNo', { akisNo: akisNumber })
    .then((resp) => {
      response = resp?.data;
    });
  return response;
};

const AkisService = () => {
  return {
    getSiradakiAdimNoBaslangic,
    adimEkle,
    getAkisByAkisNo,
  };
};

export default AkisService;
