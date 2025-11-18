import React from 'react';
import { useRouteContext } from '../../providers/RouteProvider';
import { Button, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddStepModal from './AddStepModal';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableStep from './SortableStep';

interface RouteProps {
}

const Route: React.FC<RouteProps> = ({ }) => {
  const { route, setRoute } = useRouteContext();
  const [addOpened, addHandlers] = useDisclosure(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = route.findIndex((i) => i.id === active.id);
    const newIndex = route.findIndex((i) => i.id === over.id);
    setRoute(arrayMove(route, oldIndex, newIndex));
  };

  const buttons = (
    <>
      <Button key={"Add"} onClick={() => addHandlers.open()}>Add Step</Button>
      <Button key={"Import"}>Import</Button>
      <Button key={"Export"}>Export</Button>
    </>
  );

  return (
    <div className='content-frame route-container'>
      <SimpleGrid cols={{ base: 5, sm: 3 }} mb="md">{buttons}</SimpleGrid>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={route.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {route.map((item) => (
            <SortableStep step={item} />
          ))}
        </SortableContext>
      </DndContext>
      <AddStepModal opened={addOpened} onClose={addHandlers.close} />
    </div>
  );
};

export default Route;