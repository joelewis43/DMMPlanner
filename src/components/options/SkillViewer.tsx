import { Center, Group, Paper, RingProgress, SimpleGrid, Text, Tooltip } from '@mantine/core';
import { useSkillsContext } from '../../providers/SkillsProvider';

export default function StatsRing() {
  const { skills, combatLevel, totalLevel } = useSkillsContext();

  const summaryStats = [
    { label: 'Combat Level', value: combatLevel },
    { label: 'Total Level', value: totalLevel }
  ];

  const sumStats = summaryStats.map(({ label, value }) => (
    <Paper withBorder radius="md" key={label}>
      <Center>
        <Group>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {label}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </Group>
      </Center>
    </Paper>
  ))

  const stats = Object.entries(skills).map(([name, skill]) => {
    return (
      <Paper withBorder radius="md" key={name}>
        <Group>
          <Tooltip key={name} label={`XP remaining: ${skill.xpToNextLeve}`}>
            <RingProgress
              size={50}
              roundCaps
              thickness={8}
              sections={[{ value: skill.xpPercentage ? skill.xpPercentage : 0, color: 'green' }]}
            />
          </Tooltip>

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {name}
            </Text>
            <Text fw={700} size="xl">
              {skill.level}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{sumStats}</SimpleGrid>
      <hr />
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </>
  );
}