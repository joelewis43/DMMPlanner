import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDefaultSkills, PlayerSkills, Skill, SkillName } from '../types/Skills';
import { QuestData } from '../types/Quests';
import { ComputeCombatLevel, DetermineLevel } from '../util/SkillsUtil';

interface SkillsContextType {
  skills: PlayerSkills;
  combatLevel: number;
  updateSkill: (name: SkillName, addedXp: number) => void;
  completeQuest: (quest: QuestData) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<PlayerSkills>(createDefaultSkills);
  const [combatLevel, setCombatLevel] = useState<number>(ComputeCombatLevel(skills));

  useEffect(() => {
    setCombatLevel(ComputeCombatLevel(skills));
  }, [skills]);


  const updateSkill = (name: SkillName, addedXp: number) => {
    const newXp = skills[name].xp + addedXp;
    const updatedSkill: Skill = {
      name: name,
      xp: newXp,
      level: DetermineLevel(newXp)
    }
    setSkills(prev => ({
      ...prev,
      [name]: updatedSkill
    }))
  }

  const completeQuest = (quest: QuestData) => {
    for (const skill in quest.xpRewards) {
      const name = skill as SkillName;
      const xp = quest.xpRewards[name];

      if (xp !== undefined) {
        updateSkill(name, xp);
      }
    }
  }

  return (
    <SkillsContext.Provider value={{ skills, combatLevel, updateSkill, completeQuest }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error('useSkillsContext must be used within a SkillsProvider');
  return context;
};