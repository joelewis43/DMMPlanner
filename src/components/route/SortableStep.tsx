import { useSortable } from "@dnd-kit/sortable";
import { RouteStep } from "../../types/RouteStep";
import cx from 'clsx';
import classes from '../../style/DndListHandle.module.css';
import { IconGripVertical } from "@tabler/icons-react";
import { Text } from '@mantine/core';
import { CSS } from '@dnd-kit/utilities';

interface SortableStepProps {
  step: RouteStep;
}

const SortableStep: React.FC<SortableStepProps> = ({ step }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: step.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={cx(classes.item, { [classes.itemDragging]: isDragging })}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className={classes.dragHandle} {...listeners}>
        <IconGripVertical size={18} stroke={1.5} />
      </div>
      <div>
        <Text>{step.name}</Text>
        <Text c="dimmed" size="sm">
          ID: {step.id} • Type: {step.type}
        </Text>
      </div>
    </div>
  );
}

export default SortableStep;