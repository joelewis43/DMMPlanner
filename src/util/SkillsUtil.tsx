import { PlayerSkills, SkillName, XP_TABLE } from "../types/Skills";

export const ComputeCombatLevel = (skills: PlayerSkills) => {
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

  export const DetermineLevel = (xp: number) => {
      if (xp < 0) return 1;
  
      for (let level = XP_TABLE.length - 1; level >= 0; level--) {
        if (xp >= XP_TABLE[level]) {
          return level + 1;
        }
      }
  
      return 1;
    }