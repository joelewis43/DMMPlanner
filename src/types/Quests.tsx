import { SkillName } from "./Skills";
import questsData from '../data/quests.json';

export interface QuestData {
  name: string,
  xpRewards: Partial<Record<SkillName, number>>
}


export const quests: QuestData[] = questsData;