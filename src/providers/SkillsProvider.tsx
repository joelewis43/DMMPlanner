import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDefaultSkills, PlayerSkills, Skill, SkillName } from '../types/Skills';
import { ComputeCombatLevel, ComputeTotalLevel, DetermineLevel, DetermineXpPercentage, DetermineXpToNextLevel, GetXpMultiplier } from '../util/SkillsUtil';

interface SkillsContextType {
  skills: PlayerSkills;
  combatLevel: number;
  totalLevel: number;
  combatMultiplier: number;
  nonCombatMultiplier: number;
  updateSkill: (name: SkillName, addedXp: number) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<PlayerSkills>(createDefaultSkills);
  const [combatLevel, setCombatLevel] = useState<number>(ComputeCombatLevel(skills));
  const [totalLevel, setTotalLevel] = useState<number>(ComputeTotalLevel(skills));
  const [combatMultiplier, setCombatMultiplier] = useState<number>(10);
  const [nonCombatMultiplier, setNonCombatMultiplier] = useState<number>(10);


  useEffect(() => {
    setCombatLevel(ComputeCombatLevel(skills));
    setTotalLevel(ComputeTotalLevel(skills));
  }, [skills]);

  useEffect(() => {
    setCombatMultiplier(GetXpMultiplier(combatLevel, true));
    setNonCombatMultiplier(GetXpMultiplier(combatLevel, false));
  }, [combatLevel]);

  const updateSkill = (name: SkillName, addedXp: number) => {
    const skill = skills[name];
    const mult = skill.combatSkill ? combatMultiplier : nonCombatMultiplier;
    const newXp = skill.xp + addedXp * mult;
    const newLevel = DetermineLevel(newXp);
    const updatedSkill: Skill = {
      name: name,
      xp: newXp,
      level: newLevel,
      xpToNextLeve: DetermineXpToNextLevel(newXp, newLevel),
      xpPercentage: DetermineXpPercentage(newXp, newLevel),
      combatSkill: skill.combatSkill,
    }
    setSkills(prev => ({
      ...prev,
      [name]: updatedSkill
    }))
  }

  return (
    <SkillsContext.Provider value={{ skills, combatLevel, totalLevel, combatMultiplier, nonCombatMultiplier, updateSkill }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error('useSkillsContext must be used within a SkillsProvider');
  return context;
};