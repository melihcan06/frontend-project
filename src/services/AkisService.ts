import { ButtonItem } from 'src/models/ButtonItem';

const getSiradakiAdimNoBaslangic = (buttons2: ButtonItem[]) => {
  let counter = 1;
  console.log(buttons2);
  buttons2?.forEach((from) => {
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
