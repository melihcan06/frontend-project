import { ButtonItem } from 'src/models/ButtonItem';
import {
  AkisAdim,
  AkisBag,
  AkisDto,
} from 'src/models/models_from_backend/models';
import api from './ApiService';

const createAkisAdim = (siradakiAdimNo: number): AkisAdim => {
  const adim = <AkisAdim>{
    adimNo: siradakiAdimNo,
    x: 40 + (siradakiAdimNo - 1) * 30,
    y: 40 + (siradakiAdimNo - 1) * 30,
  };
  return adim;
};

const getSiradakiAdimNo = (adimlar: AkisAdim[]) => {
  return adimlar?.length + 1; //TODO test et boş veya null veya undefined ise 1 mi dönüyor ?
};

const akisAdimEkle = (akisDto: AkisDto) => {
  const siradakiAdimNo = getSiradakiAdimNo(akisDto.listAkisAdim);
  const yeniAdim = createAkisAdim(siradakiAdimNo);
  akisDto.listAkisAdim.push(yeniAdim);
};

const getSiradakiAdimNoBaslangic = (buttons: ButtonItem[]) => {
  return buttons?.length + 1;
};

const adimEkle = (buttons: ButtonItem[]) => {
  let siradakiAdimNo = getSiradakiAdimNoBaslangic(buttons);
  createAkisAdim(siradakiAdimNo); //TODO test
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
  if (akisDto == null || akisDto == undefined) {
    return { x1: 0, y1: 0, x2: 0, y2: 0 };
  }
  const basAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.basAdimNo
  );
  const sonAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.sonAdimNo
  );
  return { x1: basAdim?.x, y1: basAdim?.y, x2: sonAdim?.x, y2: sonAdim?.y };
};

const getAkisByAkisNo = async (akisNumber: number): Promise<AkisDto> => {
  let response = <AkisDto>{};
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
    akisAdimEkle,
  };
};

export default AkisService;
