import { Center, Group, Paper, RingProgress, SimpleGrid, Text, Tooltip } from '@mantine/core';
import { useSkillsContext } from '../../providers/SkillsProvider';

export default function StatsRing() {

  const { skills, combatLevel } = useSkillsContext();

  const stats = Object.entries(skills).map(([name, skill]) => {
    return (
      <Paper withBorder radius="md" key={name}>
        <Group>
          <Tooltip key={name} label={`XP remaining: ${skill.xpToNextLeve}`}>
            <RingProgress
              size={50}
              roundCaps
              thickness={8}
              sections={[{ value: skill.xpPercentage? skill.xpPercentage : 0, color: 'green' }]}
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

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}