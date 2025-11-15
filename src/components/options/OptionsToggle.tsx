import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import SkillViewer from './SkillViewer';
import QuestViewer from './QuestViewer';

function OptionsToggle() {
  const [activeComponent, setActiveComponent] = useState('Quests');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Quests':
        return <QuestViewer />;
      case 'Skills':
        return <SkillViewer />;
      default:
        return <SkillViewer />;
    }
  };

  return (
    <div className='component-container'>
      <Dropdown onSelect={(eventKey) => setActiveComponent(eventKey as string)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {activeComponent}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Quests">Quests</Dropdown.Item>
          <Dropdown.Item eventKey="Skills">Skills</Dropdown.Item>
          <Dropdown.Item eventKey="ComponentC">Component C</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="component-section">
        {renderComponent()}
      </div>
    </div>
  );
}

export default OptionsToggle;