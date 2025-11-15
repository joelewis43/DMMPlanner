import React from 'react';
import { quests } from '../../types/Quests';
import { useRouteContext } from '../../providers/RouteProvider';

interface QuestViewerProps {
}

const QuestViewer: React.FC<QuestViewerProps> = ({ }) => {

  const {appendQuest} = useRouteContext();

  return (
    <div className='quest-container'>
      {quests.map(quest => (
        <div key={quest.name} className='quest-item' onDoubleClick={() => appendQuest(quest)}>
          <h5>{quest.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default QuestViewer;