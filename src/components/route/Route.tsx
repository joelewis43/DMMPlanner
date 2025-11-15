import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useRouteContext } from '../../providers/RouteProvider';
import DraggableStep from './DraggableStep';
import { RouteStep } from '../../types/RouteStep';

const ItemType = 'TILE';

interface RouteProps {
}

const Route: React.FC<RouteProps> = ({ }) => {
  const { route, setRoute, editRouteStep } = useRouteContext();
  const [showEditStep, setShowEditStep] = useState(false);
  const [selectedStep, setSelectedStep] = useState<RouteStep>();

  const moveStep = useCallback((fromIndex: number, toIndex: number) => {
    setRoute((prevSteps) =>
      update(prevSteps, {
        $splice: [
          [fromIndex, 1],
          [toIndex, 0, prevSteps[fromIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className='content-frame route-container'>
      <div className='task-list-header'>
        <h4 className='route-col'>Step</h4>
        <h4 className='route-col'>ID</h4>
      </div>  
      <div className='step-container'>
        {route.map((step, index) => (
          <DraggableStep
            key={step.id}
            index={index}
            step={step}
            moveStep={moveStep}
            type={ItemType}
          />
        ))}
      </div>
    </div>
  );
};

export default Route;