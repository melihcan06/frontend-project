import { IAkisAdim } from 'src/models/IAkisAdim';
import { IPosition } from 'src/models/IPosition';
import { ref } from 'vue';

const playground = ref<HTMLDivElement | null>(null);
const position = ref<IPosition>({ x: 0, y: 310 });
const offset = ref<IPosition>({ x: 310, y: 0 });
const defaultStartPosition: IPosition = { x: 110, y: 110 };
const defaultStartAdim: IAkisAdim = {
  id: Date.now(),
  position: defaultStartPosition,
};
const adimlar = ref<IAkisAdim[]>([]);

const onDragStart = (event: DragEvent) => {
  if (!event.target) return;

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onDrop = (event: DragEvent) => {
  if (!playground.value) return;

  const containerRect = playground.value.getBoundingClientRect();

  position.value = {
    x: event.clientX - containerRect.left - offset.value.x,
    y: event.clientY - containerRect.top - offset.value.y,
  };

  //test
  /*for (let i = 0; i < positions.value?.length; i++) {
    positions.value[i] = position.value;
  }*/
  for (let i = 0; i < adimlar.value?.length; i++) {
    adimlar.value[i].position = position.value;
  }

  debugger;
};

const getIdxById = (id: number) => {
  const components = PositionsService().adimlar.value;
  if (components != undefined) {
    for (let i = 0; i < components?.length; i++) {
      if (id === components[i].id) {
        return i;
      }
    }
  }
  return -1;
};

const PositionsService = () => {
  return {
    adimlar,
    defaultStartAdim,
    getIdxById,
    playground,
    defaultStartPosition,
    onDragStart,
    onDrop,
    offset,
    position,
  };
};

export default PositionsService;
