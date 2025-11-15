import React from 'react';
import { useSkillsContext } from '../../providers/SkillsProvider';

interface SkillViewerProps {
}

const SkillViewer: React.FC<SkillViewerProps> = ({ }) => {

  const { skills, combatLevel } = useSkillsContext();

  return (
    <>
    <div>Combat Level: {combatLevel}</div>
      {Object.entries(skills).map(([name, skill]) => (
          <div key={name}>{name} -- {skill.level} -- {skill.xp}</div>
      ))}
    </>

  );
};

export default SkillViewer;