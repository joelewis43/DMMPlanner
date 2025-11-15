export interface Skill {
  name: string,
  xp: number,
  level: number,
}

export enum SkillName {
  Attack = 'Attack',
  Strength = 'Strength',
  Defence = 'Defence',
  Ranged = 'Ranged',
  Prayer = 'Prayer',
  Magic = 'Magic',
  Runecraft = 'Runecraft',
  Hitpoints = 'Hitpoints',
  Crafting = 'Crafting',
  Mining = 'Mining',
  Smithing = 'Smithing',
  Fishing = 'Fishing',
  Cooking = 'Cooking',
  Firemaking = 'Firemaking',
  Woodcutting = 'Woodcutting',
  Agility = 'Agility',
  Herblore = 'Herblore',
  Thieving = 'Thieving',
  Fletching = 'Fletching',
  Slayer = 'Slayer',
  Farming = 'Farming',
  Construction = 'Construction',
  Hunter = 'Hunter',
}

export type PlayerSkills = Record<SkillName, Skill>;

// Initialize with default values
export const createDefaultSkills = (): PlayerSkills => ({
  [SkillName.Attack]: { name: SkillName.Attack, xp: 0, level: 1 },
  [SkillName.Strength]: { name: SkillName.Strength, xp: 0, level: 1 },
  [SkillName.Defence]: { name: SkillName.Defence, xp: 0, level: 1 },
  [SkillName.Ranged]: { name: SkillName.Ranged, xp: 0, level: 1 },
  [SkillName.Prayer]: { name: SkillName.Prayer, xp: 0, level: 1 },
  [SkillName.Magic]: { name: SkillName.Magic, xp: 0, level: 1 },
  [SkillName.Runecraft]: { name: SkillName.Runecraft, xp: 0, level: 1 },
  [SkillName.Hitpoints]: { name: SkillName.Hitpoints, xp: 1154, level: 10 },
  [SkillName.Crafting]: { name: SkillName.Crafting, xp: 0, level: 1 },
  [SkillName.Mining]: { name: SkillName.Mining, xp: 0, level: 1 },
  [SkillName.Smithing]: { name: SkillName.Smithing, xp: 0, level: 1 },
  [SkillName.Fishing]: { name: SkillName.Fishing, xp: 0, level: 1 },
  [SkillName.Cooking]: { name: SkillName.Cooking, xp: 0, level: 1 },
  [SkillName.Firemaking]: { name: SkillName.Firemaking, xp: 0, level: 1 },
  [SkillName.Woodcutting]: { name: SkillName.Woodcutting, xp: 0, level: 1 },
  [SkillName.Agility]: { name: SkillName.Agility, xp: 0, level: 1 },
  [SkillName.Herblore]: { name: SkillName.Herblore, xp: 0, level: 1 },
  [SkillName.Thieving]: { name: SkillName.Thieving, xp: 0, level: 1 },
  [SkillName.Fletching]: { name: SkillName.Fletching, xp: 0, level: 1 },
  [SkillName.Slayer]: { name: SkillName.Slayer, xp: 0, level: 1 },
  [SkillName.Farming]: { name: SkillName.Farming, xp: 0, level: 1 },
  [SkillName.Construction]: { name: SkillName.Construction, xp: 0, level: 1 },
  [SkillName.Hunter]: { name: SkillName.Hunter, xp: 0, level: 1 },
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