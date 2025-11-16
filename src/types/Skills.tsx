export interface Skill {
  name: string,
  xp: number,
  level: number,
  xpToNextLeve?: number,
  xpPercentage?: number,
  combatSkill: boolean,
}

export enum SkillName {
  Attack = 'Attack',
  Hitpoints = 'Hitpoints',
  Mining = 'Mining',
  Strength = 'Strength',
  Agility = 'Agility',
  Smithing = 'Smithing',
  Defence = 'Defence',
  Herblore = 'Herblore',
  Fishing = 'Fishing',
  Ranged = 'Ranged',
  Thieving = 'Thieving',
  Cooking = 'Cooking',
  Prayer = 'Prayer',
  Crafting = 'Crafting',
  Firemaking = 'Firemaking',
  Magic = 'Magic',
  Fletching = 'Fletching',
  Woodcutting = 'Woodcutting',
  Runecraft = 'Runecraft',
  Slayer = 'Slayer',
  Farming = 'Farming',
  Construction = 'Construction',
  Hunter = 'Hunter',
}

export type PlayerSkills = Record<SkillName, Skill>;

// Initialize with default values
export const createDefaultSkills = (): PlayerSkills => ({
  [SkillName.Attack]: { name: SkillName.Attack, xp: 0, level: 1, combatSkill: true },
  [SkillName.Hitpoints]: { name: SkillName.Hitpoints, xp: 1154, level: 10, combatSkill: true },
  [SkillName.Mining]: { name: SkillName.Mining, xp: 0, level: 1, combatSkill: false },
  [SkillName.Strength]: { name: SkillName.Strength, xp: 0, level: 1, combatSkill: true },
  [SkillName.Agility]: { name: SkillName.Agility, xp: 0, level: 1, combatSkill: false },
  [SkillName.Smithing]: { name: SkillName.Smithing, xp: 0, level: 1, combatSkill: false },
  [SkillName.Defence]: { name: SkillName.Defence, xp: 0, level: 1, combatSkill: true },
  [SkillName.Herblore]: { name: SkillName.Herblore, xp: 0, level: 1, combatSkill: false },
  [SkillName.Fishing]: { name: SkillName.Fishing, xp: 0, level: 1, combatSkill: false },
  [SkillName.Ranged]: { name: SkillName.Ranged, xp: 0, level: 1, combatSkill: true },
  [SkillName.Thieving]: { name: SkillName.Thieving, xp: 0, level: 1, combatSkill: false },
  [SkillName.Cooking]: { name: SkillName.Cooking, xp: 0, level: 1, combatSkill: false },
  [SkillName.Prayer]: { name: SkillName.Prayer, xp: 0, level: 1, combatSkill: true },
  [SkillName.Crafting]: { name: SkillName.Crafting, xp: 0, level: 1, combatSkill: false },
  [SkillName.Firemaking]: { name: SkillName.Firemaking, xp: 0, level: 1, combatSkill: false },
  [SkillName.Magic]: { name: SkillName.Magic, xp: 0, level: 1, combatSkill: true },
  [SkillName.Fletching]: { name: SkillName.Fletching, xp: 0, level: 1, combatSkill: false },
  [SkillName.Woodcutting]: { name: SkillName.Woodcutting, xp: 0, level: 1, combatSkill: false },
  [SkillName.Runecraft]: { name: SkillName.Runecraft, xp: 0, level: 1, combatSkill: true },
  [SkillName.Slayer]: { name: SkillName.Slayer, xp: 0, level: 1, combatSkill: false },
  [SkillName.Farming]: { name: SkillName.Farming, xp: 0, level: 1, combatSkill: false },
  [SkillName.Construction]: { name: SkillName.Construction, xp: 0, level: 1, combatSkill: false },
  [SkillName.Hunter]: { name: SkillName.Hunter, xp: 0, level: 1, combatSkill: false },
});

export const XP_TABLE: number[] = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411,
  2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824,
  12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648,
  37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
  111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886,
  273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032,
  668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581,
  1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594,
  3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629,
  7944614, 8771558, 9684577, 10692629, 11805606, 13034431
];

export interface XpMultiplierTier {
  low: number;
  high: number;
  combatRate: number;
  nonCombatRate: number;
}

// nonCombatRate could just be a const, but including incase it does end up changing before launch
export const XP_MULTIPLIERS: XpMultiplierTier[] = [
  { low: 3, high: 60, combatRate: 10, nonCombatRate: 10 },
  { low: 61, high: 80, combatRate: 15, nonCombatRate: 10 },
  { low: 81, high: 95, combatRate: 15, nonCombatRate: 10 },
  { low: 96, high: 200, combatRate: 20, nonCombatRate: 10 },
];