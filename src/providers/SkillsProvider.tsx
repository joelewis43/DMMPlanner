import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDefaultSkills, PlayerSkills, Skill, SkillName } from '../types/Skills';
import { ComputeCombatLevel, ComputeTotalLevel, DetermineLevel, DetermineXpPercentage, DetermineXpToNextLevel } from '../util/SkillsUtil';

interface SkillsContextType {
  skills: PlayerSkills;
  combatLevel: number;
  totalLevel: number;
  updateSkill: (name: SkillName, addedXp: number) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<PlayerSkills>(createDefaultSkills);
  const [combatLevel, setCombatLevel] = useState<number>(ComputeCombatLevel(skills));
  const [totalLevel, setTotalLevel] = useState<number>(ComputeTotalLevel(skills));

  useEffect(() => {
    setCombatLevel(ComputeCombatLevel(skills));
    setTotalLevel(ComputeTotalLevel(skills));
  }, [skills]);


  const updateSkill = (name: SkillName, addedXp: number) => {
    const newXp = skills[name].xp + addedXp;
    const newLevel = DetermineLevel(newXp);
    const updatedSkill: Skill = {
      name: name,
      xp: newXp,
      level: newLevel,
      xpToNextLeve: DetermineXpToNextLevel(newXp, newLevel),
      xpPercentage: DetermineXpPercentage(newXp, newLevel)
    }
    setSkills(prev => ({
      ...prev,
      [name]: updatedSkill
    }))
  }

  return (
    <SkillsContext.Provider value={{ skills, combatLevel, totalLevel, updateSkill }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error('useSkillsContext must be used within a SkillsProvider');
  return context;
};