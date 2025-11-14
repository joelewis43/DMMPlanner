import React, { createContext, useContext, useState } from 'react';
import { createDefaultSkills, PlayerSkills, Skill, SkillName } from '../types/Skills';

interface SkillsContextType {
  skills: PlayerSkills;
  updateSkill: (name: SkillName, addedXp: number) => void;
  getCombatLevel: () => number;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<PlayerSkills>(createDefaultSkills);

  const updateSkill = (name: SkillName, addedXp: number) => {
    const updatedSkill: Skill = {
      name: name,
      xp: skills[name].xp + addedXp,
      level: skills[name].level
    }
    setSkills(prev => ({
      ...prev,
      [name]: updatedSkill
    }))
  }

  const getCombatLevel = () => {
    const defence = skills[SkillName.Defence].level;
    const hitpoints = skills[SkillName.Hitpoints].level;
    const prayer = skills[SkillName.Prayer].level;
    const attack = skills[SkillName.Attack].level;
    const strength = skills[SkillName.Strength].level;
    const ranged = skills[SkillName.Ranged].level;
    const magic = skills[SkillName.Magic].level;

    const base = (1 / 4) * (defence + hitpoints + Math.floor(prayer * 0.5));
    const melee = (13 / 40) * (attack + strength);
    const range = (13 / 40) * Math.floor(ranged * 1.5);
    const mage = (13 / 40) * Math.floor(magic * 1.5);
    const final = Math.floor(base + Math.max(melee, range, mage));

    return final;
  }

  return (
    <SkillsContext.Provider value={{ skills, updateSkill, getCombatLevel }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error('useSkillsContext must be used within a SkillsProvider');
  return context;
};