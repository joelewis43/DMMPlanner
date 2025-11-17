import { useState } from 'react';
import { Table, Text, TextInput, ActionIcon, Tooltip } from '@mantine/core';
import { useQuestContext } from '../../providers/QuestProvider';
import { useRouteContext } from '../../providers/RouteProvider';
import { QuestData } from '../../types/Quests';
import { IconInfoCircle } from '@tabler/icons-react';

interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  return (
    <Table.Th>
      <Text fw={500} fz="sm">
        {children}
      </Text>
    </Table.Th>
  );
}

export default function QuestViewer() {

  const { quests, completeQuest } = useQuestContext();
  const { appendQuest } = useRouteContext();

  const handleQuestDoubleClick = (name: string, questData: QuestData) => {
    completeQuest(name);
    appendQuest(questData);
  }

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState([...quests.entries()]);

  function filterData(input: string) {
    const query = input.toLowerCase();
    return Array.from(quests).filter(([name, questData]) => {
      const nameCheck = name.toLowerCase().includes(query);

      let hasMatchingXpReward: boolean = false;
      const xpRewards = questData.rewards.xpRewards;
      if (xpRewards) {
        hasMatchingXpReward = Object.keys(xpRewards).some(
          (skillName: string) => skillName.toLowerCase().includes(query)
        );
      }
      return nameCheck || hasMatchingXpReward;
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(filterData(value));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row[0]} className='hover' onDoubleClick={() => handleQuestDoubleClick(row[0], row[1])}>
      <Table.Td className='no-select'>{row[0]}</Table.Td>
      <Table.Td className='no-select'>{row[1].completed ? "Done" : "Not Done"}</Table.Td>
    </Table.Tr>
  ));

  const tooltipIcon = (
    <Tooltip
      label={"Search for quest names or skill xp rewards"}
      position="bottom-end"
      multiline
      w={200} // Set a width for the multiline tooltip
    >
        <IconInfoCircle />
    </Tooltip>
  );

  return (
    <div className="quest-table" >
      <TextInput
        placeholder="Search by any field"
        mb="md"
        rightSection={tooltipIcon}
        value={search}
        onChange={handleSearchChange}
      />
      <Table.ScrollContainer maxHeight={800} minWidth={500}>
        <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
          <Table.Thead>
            <Table.Tr>
              <Th>
                Quest Name
              </Th>
              <Th>
                Status
              </Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}