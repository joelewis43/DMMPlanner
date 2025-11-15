import React from 'react';
import { useQuestContext } from '../../providers/QuestProvider';
import { useRouteContext } from '../../providers/RouteProvider';
import { QuestData } from '../../types/Quests';

interface QuestViewerProps {
}

const QuestViewer: React.FC<QuestViewerProps> = ({ }) => {
  const { quests, completeQuest } = useQuestContext();
  const {appendQuest} = useRouteContext();

  const handleQuestDoubleClick = (name: string, questData: QuestData) => {
    completeQuest(name);
    appendQuest(questData);
  }

  return (
    <div className='quest-container'>
      {Array.from(quests.entries()).map(([name, quest]) => (
        <div key={name} className='quest-item' onDoubleClick={() => handleQuestDoubleClick(name, quest)}>
          <span>{name} -- {quest.completed ? 'Done' : 'Not Done'}</span>
        </div>
      ))}
    </div>
  );
};

export default QuestViewer;