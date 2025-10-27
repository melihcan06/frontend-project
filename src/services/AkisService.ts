import { ButtonItem } from 'src/models/ButtonItem';
import { AkisBag, AkisDto } from 'src/models/models_from_backend/models';
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

const getBagKonum = (akisDto: AkisDto | null | undefined, akisBag: AkisBag) => {
  debugger;
  if (akisDto == null || akisDto == undefined) {
    return { x1: 0, y1: 0, x2: 0, y2: 0 };
  }
  const basAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.basAdimNo
  );
  const sonAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.sonAdimNo
  );
  console.log({
    x1: basAdim?.x,
    y1: basAdim?.y,
    x2: sonAdim?.x,
    y2: sonAdim?.y,
  });
  return { x1: basAdim?.x, y1: basAdim?.y, x2: sonAdim?.x, y2: sonAdim?.y };
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
    getBagKonum,
  };
};

export default AkisService;
