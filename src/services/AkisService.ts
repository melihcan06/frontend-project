import { ButtonItem } from 'src/models/ButtonItem';

const getSiradakiAdimNoBaslangic = (buttons: ButtonItem[]) => {
  let counter = 1;
  buttons?.forEach((from) => {
    if (from.id > counter) {
      counter = from.id;
    }
  });
  return counter + 1;
};

const AkisService = () => {
  return {
    getSiradakiAdimNoBaslangic,
  };
};

export default AkisService;
