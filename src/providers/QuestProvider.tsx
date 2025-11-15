import React, { createContext, useContext, useState } from 'react';
import { QuestData, questsMap } from '../types/Quests';
import { useSkillsContext } from './SkillsProvider';
import { SkillName } from '../types/Skills';

interface QuestContextType {
  quests: Map<string, QuestData>;
  completeQuest: (name: string) => void;
  incompleteQuest: (name: string) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ quests ] = useState<Map<string, QuestData>>(questsMap);
  const { updateSkill } = useSkillsContext();

  const completeQuest = (name: string) => {
    if (quests.has(name)) {
      quests.get(name)!.completed = true;
      updateQuestXp(quests.get(name)!, false);
    }
  }

  const incompleteQuest = (name: string) => {
    if (quests.has(name)) {
      quests.get(name)!.completed = false;
      updateQuestXp(quests.get(name)!, true);
    } 
  }

  const updateQuestXp = (quest: QuestData, removeXp: boolean) => {
    for (const skill in quest.xpRewards) {
      const name = skill as SkillName;
      let xp = quest.xpRewards[name];
      if (xp !== undefined) {
        if (removeXp) xp = -1 * xp;
        updateSkill(name, xp);
      }
    }
  }

  return (
    <QuestContext.Provider value={{ quests, completeQuest, incompleteQuest }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuestContext = () => {
  const context = useContext(QuestContext);
  if (!context) throw new Error('useQuestContext must be used within a QuestProvider');
  return context;
};