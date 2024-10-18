import app from './App.module.css'
import Board from './components/board/board'
import AddTaskModal from './components/modals/addTaskModal'
import CreateNewBoardModal from './components/modals/createNewBoardModal'
import DeleteBoardModal from './components/modals/deleteBoardModal'
import SideBar from './components/sidebar/SideBar'

function App() {
  
  return (
    <>
      <div className= {app.container}>
          <SideBar/>
          <Board/>
          <AddTaskModal/>
          <CreateNewBoardModal/>
          <DeleteBoardModal/>

          
      </div>
    </>
  )
}

export default App
