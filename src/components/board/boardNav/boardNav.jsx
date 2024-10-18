import { useRef } from 'react'
import boardNav from './boardNav.module.css'
import { useDispatch } from 'react-redux'


function BoardNav(){
    const menuRef=useRef()
    const dispatch = useDispatch()

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

    function handelToggle(){
        if(menuRef.current.style.display=="none"){
            menuRef.current.style.display="flex"
        }else{
            menuRef.current.style.display="none"
        }
    }


    return(
        <>
            <nav className={boardNav.nav}>
                <div className={boardNav.title}>
                    <h1>Board Name</h1>
                    <i className="material-symbols-outlined">
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
                <span>Edit Board</span>
                <span onClick={handleDeleteBtn} >Delete Board</span>
            </div>
        </>
    )
}


export default BoardNav