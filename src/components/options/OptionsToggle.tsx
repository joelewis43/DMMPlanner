import React, { useState } from 'react';
import SkillViewer from './SkillViewer';
import QuestViewer from './QuestViewer';
import { Options } from '../../types/OptionsEnum';

interface NavProps {
  activeComponent: Options;
}

const OptionsToggle: React.FC<NavProps> = ({ activeComponent }) => {

  const renderComponent = () => {
    switch (activeComponent) {
      case Options.Quests:
        return <QuestViewer />;
      case Options.Skills:
        return <SkillViewer />;
      default:
        return <SkillViewer />;
    }
  };

  return (
    <div className='content-frame component-section'>
        {renderComponent()}
    </div>
  );
}

export default OptionsToggle;