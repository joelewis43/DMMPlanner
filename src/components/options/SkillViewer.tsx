import React from 'react';
import { useSkillsContext } from '../../providers/SkillsProvider';

interface SkillViewerProps {
}

const SkillViewer: React.FC<SkillViewerProps> = ({ }) => {

  const { skills, getCombatLevel } = useSkillsContext();

  return (
    <>
    <div>Combat Level: {getCombatLevel()}</div>
      {Object.entries(skills).map(([name, skill]) => (
          <div key={name}>{name} -- {skill.level} -- {skill.xp}</div>
      ))}
    </>

  );
};

export default SkillViewer;