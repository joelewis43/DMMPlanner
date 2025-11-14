import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Route from '../components/route/Route'
import { RouteProvider } from '../providers/RouteProvider'
import Nav from '../components/nav/Nav'
import { SkillsProvider } from '../providers/SkillsProvider'
import OptionsToggle from '../components/options/OptionsToggle'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SkillsProvider>
        <RouteProvider>
          <div className='nav'>
            <Nav />
          </div>
          <div className='content'>
            <div className='options'>
              <OptionsToggle />
            </div>
            <div className='route'>
              <Route />
            </div>
          </div>
        </RouteProvider>
      </SkillsProvider>
    </DndProvider>
  )
}

export default App
