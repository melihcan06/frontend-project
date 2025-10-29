import {
  AkisAdim,
  AkisBag,
  AkisDto,
} from 'src/models/models_from_backend/models';
import api from './ApiService';
import { ref } from 'vue';

const connectMode = ref(false);

const createAkisDto = (): AkisDto => {
  const akis = <AkisDto>{
    listAkisAdim: <AkisAdim[]>[],
    listAkisBag: <AkisBag[]>[],
  };
  return akis;
};

const createAkisAdim = (
  siradakiAdimNo: number,
  akisVersiyonId: string
): AkisAdim => {
  const adim = <AkisAdim>{
    status: '1',
    akisVersiyonId: akisVersiyonId,
    adimNo: siradakiAdimNo,
    x: 40 + (siradakiAdimNo - 1) * 30,
    y: 40 + (siradakiAdimNo - 1) * 30,
  };
  return adim;
};

const createAkisBag = (
  basAdimNo: number,
  sonAdimNo: number,
  akisVersiyonId: string
): AkisBag => {
  const bag = <AkisBag>{
    status: '1',
    akisVersiyonId: akisVersiyonId,
    basAdimNo: basAdimNo,
    sonAdimNo: sonAdimNo,
  };
  return bag;
};

const getSiradakiAdimNo = (adimlar: AkisAdim[]) => {
  const no = adimlar?.length + 1;
  return Number.isNaN(no) ? 1 : no;
};

const akisAdimEkle = (akisDto: AkisDto) => {
  if (!akisDto.listAkisAdim) {
    return;
  }
  const siradakiAdimNo = getSiradakiAdimNo(akisDto.listAkisAdim);
  const yeniAdim = createAkisAdim(siradakiAdimNo, akisDto.aktifVersiyon?.id);
  akisDto.listAkisAdim.push(yeniAdim);
};

const akisBagEkle = (akisDto: AkisDto, id1: number, id2: number) => {
  const yeniBag = createAkisBag(id1, id2, akisDto.aktifVersiyon.id);
  akisDto.listAkisBag.push(yeniBag);
};

const getBagBasSonAdimlar = (
  akisDto: AkisDto | null | undefined,
  akisBag: AkisBag
) => {
  if (akisDto == null || akisDto == undefined) {
    return { basAdim: <AkisAdim>{}, sonAdim: <AkisAdim>{} };
  }
  const basAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.basAdimNo
  );
  const sonAdim = akisDto.listAkisAdim.find(
    (aa) => aa.adimNo == akisBag.sonAdimNo
  );
  return { basAdim: basAdim, sonAdim: sonAdim };
};

const getBagKonum = (akisDto: AkisDto | null | undefined, akisBag: AkisBag) => {
  if (akisDto == null || akisDto == undefined) {
    return { x1: 0, y1: 0, x2: 0, y2: 0 };
  }
  const { basAdim, sonAdim } = getBagBasSonAdimlar(akisDto, akisBag);
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
    connectMode,
    createAkisDto,
    getAkisByAkisNo,
    getBagBasSonAdimlar,
    getBagKonum,
    akisAdimEkle,
    akisBagEkle,
  };
};

export default AkisService;
