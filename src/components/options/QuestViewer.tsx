import { useState } from 'react';
import { Table, Text, TextInput } from '@mantine/core';
import { useQuestContext } from '../../providers/QuestProvider';
import { useRouteContext } from '../../providers/RouteProvider';
import { QuestData } from '../../types/Quests';

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

  function filterData(search: string) {
    const query = search.toLowerCase().trim();
    return sortedData.filter((q) => q[0].toLowerCase().includes(query));
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

  return (
    <div>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        // leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
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
    </div>
  );
}