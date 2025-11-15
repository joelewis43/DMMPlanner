import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Route from '../components/route/Route'
import { RouteProvider } from '../providers/RouteProvider'
import Nav from '../components/nav/Nav'
import { SkillsProvider } from '../providers/SkillsProvider'
import OptionsToggle from '../components/options/OptionsToggle'
import { MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { Options } from '../types/OptionsEnum'
import { QuestProvider } from '../providers/QuestProvider'

function App() {
  const [activeComponent, setActiveComponent] = useState(Options.Skills);


  return (
    <MantineProvider>
      <DndProvider backend={HTML5Backend}>
        <SkillsProvider>
          <QuestProvider>
            <RouteProvider>
              <Nav updateSelection={setActiveComponent} />
              <div className='content'>
                <OptionsToggle activeComponent={activeComponent} />
                <Route />
              </div>
            </RouteProvider>
          </QuestProvider>
        </SkillsProvider>
      </DndProvider>
    </MantineProvider>
  )
}

export default App
