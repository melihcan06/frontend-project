import { IPosition } from 'src/models/IPosition';
import { ref } from 'vue';

const positions = ref<IPosition[]>();
const offsets = ref<IPosition[]>();
const playground = ref<HTMLDivElement | null>(null);
const position = ref({ x: 50, y: 50 }); // Başlangıç konumu
const offset = ref({ x: 0, y: 0 });

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
};

const PositionsService = () => {
  return { positions, offsets, onDragStart, onDrop };
};

export default PositionsService;
