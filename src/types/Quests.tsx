import { SkillName } from "./Skills";
import questsDataRaw from '../data/quests.json';

export interface QuestData {
  name: string,
  rewards: Rewards,
  completed: boolean
}

export interface Rewards {
  xpRewards?: Partial<Record<SkillName, number>>,
  lamps?: XpLamp,
}

export interface XpLamp {
  skillChoice: SkillName[] | 'Any',
  levelReq: number,
  grants: number,
  xpValue: number,
}

export const questsMap: Map<string, QuestData> = new Map(
  Object.entries(questsDataRaw).map(([name, data]) => [
    name,
    {...data, name: name, completed: false} as QuestData
  ])
);