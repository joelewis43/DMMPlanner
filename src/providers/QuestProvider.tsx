import React, { createContext, useContext, useState } from 'react';
import { QuestData, questsMap } from '../types/Quests';
import { useSkillsContext } from './SkillsProvider';
import { SkillName } from '../types/Skills';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, SimpleGrid } from '@mantine/core';

interface QuestContextType {
  quests: Map<string, QuestData>;
  completeQuest: (name: string) => void;
  incompleteQuest: (name: string) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests] = useState<Map<string, QuestData>>(questsMap);
  const { updateSkill } = useSkillsContext();

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [pendingLamp, setPendingLamp] = useState<{
    quest: QuestData;
    removeXp: boolean;
    remainingGrants: number;
  } | null>(null);

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

    // Handle XP lamp - show modal for skill selection
    if (quest.rewards?.lamps) {
      const lamp = quest.rewards.lamps;

      if (lamp.skillChoice === 'Any' || Array.isArray(lamp.skillChoice)) {
        // Open modal for user to choose skill(s)
        setPendingLamp({
          quest,
          removeXp,
          remainingGrants: lamp.grants
        });
        open();
      }
    }
  };


  const handleSkillSelection = (selectedSkill: SkillName) => {
    if (pendingLamp) {
      const { quest, removeXp, remainingGrants } = pendingLamp;
      const lamp = quest.rewards.lamps!;

      // Apply XP for this single grant
      let xp = lamp.xpValue;
      if (removeXp) xp = -1 * xp;
      updateSkill(selectedSkill, xp);

      // Check if there are more grants remaining
      const newRemainingGrants = remainingGrants - 1;
      if (newRemainingGrants > 0) {
        // Update remaining grants and keep modal open
        setPendingLamp({ quest, removeXp, remainingGrants: newRemainingGrants });
      } else {
        // All grants used, close modal
        close();
        setPendingLamp(null);
      }
    }
  };

  const handleModalClose = () => {
    close();
    setPendingLamp(null);
  };

  // Get available skills from the lamp
  const getAvailableSkills = (): SkillName[] => {
    if (!pendingLamp) return [];

    const lamp = pendingLamp.quest.rewards.lamps!;
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

      {/* Skill Selection Modal */}
      <Modal
        opened={opened}
        onClose={handleModalClose}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        title={pendingLamp ? `Choose a Skill for ${pendingLamp.quest.name}` : ''}
        centered
        size="md"
      >
        {pendingLamp && (
          <>
            <p>
              Select which skill to apply {pendingLamp.quest.rewards.lamps!.xpValue} XP to
              {` (${pendingLamp.remainingGrants} selections remaining)`}
            </p>
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