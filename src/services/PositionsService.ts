import { IPosition } from 'src/models/IPosition';
import { ref } from 'vue';

const components = ref<number[]>([]);
const positions = ref<IPosition[]>();
const playground = ref<HTMLDivElement | null>(null);
const position = ref<IPosition>({ x: 0, y: 310 });
const offset = ref<IPosition>({ x: 310, y: 0 });
const defaultStartPosition: IPosition = { x: 110, y: 110 };

const onDragStart = (event: DragEvent) => {
  if (!event.target) return;

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onDrop = (event: DragEvent) => {
  debugger;
  if (!playground.value) return;

  const containerRect = playground.value.getBoundingClientRect();

  position.value = {
    x: event.clientX - containerRect.left - offset.value.x,
    y: event.clientY - containerRect.top - offset.value.y,
  };
};

const PositionsService = () => {
  return {
    components,
    positions,
    playground,
    defaultStartPosition,
    onDragStart,
    onDrop,
    offset,
    position,
  };
};

export default PositionsService;
