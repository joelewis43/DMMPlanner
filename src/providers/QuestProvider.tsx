import React, { createContext, useContext, useState } from 'react';
import { QuestData, questsMap, XpLamp } from '../types/Quests';
import { useSkillsContext } from './SkillsProvider';
import { SkillName } from '../types/Skills';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, SimpleGrid } from '@mantine/core';

interface QuestContextType {
  quests: Map<string, QuestData>;
  completeQuest: (name: string) => void;
  incompleteQuest: (name: string) => void;
}

interface RenderLampData {
  lamp: XpLamp;
  removeXp: boolean;
  remainingGrants: number;
  questName: string;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests] = useState<Map<string, QuestData>>(questsMap);
  const { updateSkill } = useSkillsContext();

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [activeLamp, setActiveLamp] = useState<RenderLampData>();

  const completeQuest = (name: string) => {
    if (quests.has(name)) {
      quests.get(name)!.completed = true;
      updateQuestXp(quests.get(name)!, false);
    }
  }

  const incompleteQuest = (name: string) => {
    if (quests.has(name)) {
      quests.get(name)!.completed = false;
      updateQuestXp(quests.get(name)!, true);
    }
  }

  const updateQuestXp = (quest: QuestData, removeXp: boolean) => {
    // Handle regular XP rewards
    if (quest.rewards?.xpRewards) {
      for (const skill in quest.rewards.xpRewards) {
        const name = skill as SkillName;
        let xp = quest.rewards.xpRewards[name];
        if (xp !== undefined) {
          if (removeXp) xp = -1 * xp;
          updateSkill(name, xp);
        }
      }
    }

    // Ingress for Lamp workflow
    if (quest.rewards?.lamps) {
      const lamp = quest.rewards.lamps;
      setActiveLamp({
        lamp,
        removeXp,
        remainingGrants: lamp.grants,
        questName: quest.name
      });
      open();
    }
  };


  const handleSkillSelection = (selectedSkill: SkillName) => {
    if (activeLamp) {
      const { lamp, removeXp, remainingGrants } = activeLamp;

      // Apply XP for this single grant
      let xp = lamp.xpValue;
      if (removeXp) xp = -1 * xp;
      updateSkill(selectedSkill, xp);

      // Check if there are more grants remaining
      const newRemainingGrants = remainingGrants - 1;
      if (newRemainingGrants > 0) {
        // Update remaining grants and keep modal open
        setActiveLamp({ ...activeLamp, remainingGrants: newRemainingGrants });
      } else {
        // All grants used, close modal
        close();
        setActiveLamp(undefined);
      }
    }
  };

  const handleModalClose = () => {
    close();
    setActiveLamp(undefined);
  };

  // Get available skills from the lamp
  const getAvailableSkills = (): SkillName[] => {
    if (!activeLamp) return [];

    const lamp = activeLamp.lamp;
    if (lamp.skillChoice === 'Any') {
      return Object.values(SkillName);
    } else if (Array.isArray(lamp.skillChoice)) {
      return lamp.skillChoice;
    }
    return [];
  };

  return (
    <QuestContext.Provider value={{ quests, completeQuest, incompleteQuest }}>
      {children}

      <Modal
        opened={opened}
        onClose={handleModalClose}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        title={activeLamp ? `Choose a Skill for ${activeLamp.questName}` : ''}
        centered
        size="md"
      >
        {activeLamp && (
          <>
            <p>Select which skill to apply {activeLamp.lamp.xpValue} XP to {`(${activeLamp.remainingGrants} selections remaining)`}</p>
            <SimpleGrid cols={{ base: 1, sm: 3 }} >
              {getAvailableSkills().map(skill => (
                <Button variant="filled" key={skill} onClick={() => handleSkillSelection(skill)}>
                  {skill}
                </Button>
              ))}
            </SimpleGrid>
          </>
        )}
      </Modal>
    </QuestContext.Provider>
  );
};

export const useQuestContext = () => {
  const context = useContext(QuestContext);
  if (!context) throw new Error('useQuestContext must be used within a QuestProvider');
  return context;
};