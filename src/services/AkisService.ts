import { ButtonItem } from 'src/models/ButtonItem';

const getSiradakiAdimNoBaslangic = (buttons: ButtonItem[]) => {
  let counter = 0;
  buttons?.forEach((from) => {
    if (from.id > counter) {
      counter = from.id;
    }
  });
  debugger;
  return counter + 1;
};

const AkisService = () => {
  return {
    getSiradakiAdimNoBaslangic,
  };
};

export default AkisService;
