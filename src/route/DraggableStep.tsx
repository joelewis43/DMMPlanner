import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useRouteContext } from '../providers/RouteProvider';
import { RouteStep } from '../types/RouteStep';

interface DraggableStepProps {
  step: RouteStep;
  index: number;
  moveStep: (from: number, to: number) => void;
  type: string;
}

const DraggableStep: React.FC<DraggableStepProps> = ({ step, index, moveStep, type }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { deleteStepFromRoute } = useRouteContext();

  const [, drop] = useDrop({
    accept: type,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  if (isDragging && 0) return;

  return (
    <div ref={ref} className={`drag-task-container`}>

      <div className='route-col'>
        <p className='step-content'>{step.name}</p>
      </div>

      <div className='route-col'>
        <p className='step-content'>{step.id}</p>
      </div>

      <div className='button-container'>
        {/* <FaEdit className='step-button' onClick={() => editStep(step)}/> */}
        <button className='step-button' onClick={() => deleteStepFromRoute(step.id)}/>
      </div>
    </div>
  );
};

export default DraggableStep;