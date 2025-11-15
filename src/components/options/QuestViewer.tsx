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
          <h3>{quest.name}</h3>
          <div>
            {Object.entries(quest.xpRewards).map(([skillName, xp]) => (
              <div key={skillName}>
                {skillName}: {xp} XP
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestViewer;