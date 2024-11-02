/* eslint-disable react/prop-types */
import { useRef } from 'react'
import boardNav from './boardNav.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentBoard } from '../../../functions/getCurrentElement'


function BoardNav(){
    
    const dispatch = useDispatch()
    const teamBoards =useSelector(state=>state.teamBoards)
    const currentElementId =useSelector(state=>state.currentElementId)
    const board = getCurrentBoard(teamBoards,currentElementId.boardId)
    const menuRef=useRef()

    

    // ======= open add task modal func ===========//
    function handleAddTaskBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"addTaskModal"
        })
    }
// ======= open delete board modal func ===========//
    function handleDeleteBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"deleteBoardModal"
        })
    }
// ======= open edit board modal func ===========//
    function handleEditBoardBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"editBoardModal"
        })
    }
// ================== open menu ============ //
    function handelToggle(){
        if(menuRef.current.style.display=="none"){
            menuRef.current.style.display="flex"
        }else{
            menuRef.current.style.display="none"
        }
    }
// ======== open sidebar modal for mobile  ===============//
function handelOpenSideBarModal(){
    dispatch({
        type:"openModalUpdate",
        data:"sideBarModal"
    })
}


    return(
        <>
            <nav className={boardNav.nav}>
                <div className={boardNav.title}>
                    <h1>{board?.name}</h1>
                    <i onClick={handelOpenSideBarModal} className="material-symbols-outlined">
                        keyboard_arrow_down
                    </i>
                </div>
                <button onClick={handleAddTaskBtn} className={boardNav.addTaskBtn}>
                    <i className="material-symbols-outlined">add</i>
                    <span>Add New Task</span>
                </button>
                <button onClick={handelToggle} className={boardNav.toggle}>
                    <i className="material-symbols-outlined">more_vert</i>
                </button>
            </nav>
            <div ref={menuRef} style={{display:"none"}} className={boardNav.menu} >
                <span onClick={handleEditBoardBtn} >Edit Board</span>
                <span onClick={handleDeleteBtn} >Delete Board</span>
            </div>
        </>
    )
}


export default BoardNav