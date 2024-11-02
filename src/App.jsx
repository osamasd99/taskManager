

import app from './App.module.css'
import SideBarModal from './components/modals/sideBarModal'
import SideBar from './components/sidebar/SideBar'
import CreateNewBoardModal from './components/modals/createNewBoardModal'
import Board from './components/board/Board'





function App() {
 

    
  
  return (
    <>
      <div className= {app.container}>
            <SideBar/>
            <Board/>
            <SideBarModal/> 
            <CreateNewBoardModal/>
      </div>
     
    </>
  )
}

export default App
