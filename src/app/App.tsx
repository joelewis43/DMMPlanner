import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Route from '../route/Route'
import { RouteProvider } from '../providers/RouteProvider'
import Nav from '../nav/Nav'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RouteProvider>
        <div className='nav'>
          <Nav />
        </div>
        <div className='content'>
          <div className='options'>
            This is all of your options
          </div>
          <div className='route'>
            <Route />
          </div>
        </div>
      </RouteProvider>
    </DndProvider>
  )
}

export default App
