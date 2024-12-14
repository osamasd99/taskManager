

import app from './App.module.css'
import SideBarModal from './components/modals/sideBarModal'
import SideBar from './components/sidebar/SideBar'
import CreateNewBoardModal from './components/modals/createNewBoardModal'
import Board from './components/teamBoards/Board'
import {  Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import DashBoard from './components/dashboard/dashBoard'


function TeamBoards(){
  return(
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


function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashBoard' element={<DashBoard/>} />
        <Route path='/teamName' element={<TeamBoards/>} />
      </Routes>
      
    </>
  )
}

export default App
