import { ButtonItem } from 'src/models/ButtonItem';
import { AkisAdim } from 'src/models/models_from_backend/models';

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

  //test
  const temp2 = <AkisAdim>{
    adimNo: siradakiAdimNo,
  };
  console.log(temp2);
  debugger;

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

const AkisService = () => {
  return {
    getSiradakiAdimNoBaslangic,
    adimEkle,
  };
};

export default AkisService;
