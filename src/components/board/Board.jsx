/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux'
import board from './Board.module.css'
import BoardCanvas from './boardCanvas/boardCanva'
import BoardNav from './boardNav/boardNav'
import AddTaskModal from '../modals/addTaskModal'
import EditBoardModal from '../modals/editBoardModal'
import DeleteBoardModal from '../modals/deleteBoardModal'
import AddColumnModal from '../modals/addColumnModal'
import TaskCardModal from '../modals/taskCardModal'
import EditTaskModal from '../modals/editTaskModal'
import DeleteTaskModal from '../modals/deleteTaskModal'


function Board(){
    const currentElementId =useSelector(state=>state.currentElementId)

    return(
        <>
            {/* all of this components dependent on current board id to work ,so if the id of board dose not exist dose not render   */}
            { currentElementId.boardId!=false? <>
            <div className={board.container}>
                <BoardNav />    
                <BoardCanvas />
            </div>
            <AddTaskModal />
            <EditBoardModal />
            <DeleteBoardModal />
            <AddColumnModal />  
            </>:<div className={board.container} />}
            {   currentElementId.taskId!=false? 
                <> 
                <TaskCardModal/>
                <EditTaskModal/>
                <DeleteTaskModal/> 
                
                </>:false
            }
            
        </>
    )
}

export default Board