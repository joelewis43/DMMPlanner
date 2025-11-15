import { SkillName } from "./Skills";
import questsDataRaw from '../data/quests.json';

export interface QuestData {
  name: string,
  xpRewards: Partial<Record<SkillName, number>>,
  completed: boolean
}

export const questsMap: Map<string, QuestData> = new Map(
  Object.entries(questsDataRaw).map(([name, data]) => [
    name,
    {...data, name: name, completed: false}
  ])
);