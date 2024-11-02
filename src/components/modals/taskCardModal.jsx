import { useDispatch, useSelector } from 'react-redux'
import modal from './modal.module.css'
import { useEffect,  useRef } from 'react'
import DeleteTaskModal from './deleteTaskModal'
import EditTaskModal from './editTaskModal'
import {  getCurrentBoard, getCurrentTask } from '../../functions/getCurrentElement'

function TaskCardModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal) // handel close  & open modal 
    const teamBoards =useSelector(state=>state.teamBoards) // all boards data
    const currentElementId=useSelector(state=>state.currentElementId)// to get the current element id we work on it 
    const board = getCurrentBoard(teamBoards,currentElementId.boardId)
    const task =getCurrentTask(teamBoards,currentElementId.boardId,currentElementId.columnId,currentElementId.taskId)
    const modalRef= useRef()
    const menuRef= useRef()
    const optionsRef = useRef()
    
    //=============== handel open & close modal ===========//
    useEffect(()=>{
        if(openModal=="taskCardModal"){
            modalRef.current.style.display="flex"
        }else{
            modalRef.current.style.display="none"
           
        }
    },[openModal])
    function handelCloseModal(e){
        if(e.target==modalRef.current){
            dispatch({
                type:"openModalUpdate",
                data:"none"
            })
        }
    }
    // ================== open menu ============ //
    function handelToggle(){
        if(menuRef.current.style.display=="none"){
            menuRef.current.style.display="flex"
        }else{
            menuRef.current.style.display="none"
        }
    }
    // =================== open delete task  modal ====================//
    function handelDeleteBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"deleteTaskModal"
        })
    }
    // ====================== open edit task modal =====================//
    function handelEditTaskBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"editTaskModal"
        })
        
    }
    //======================= open select menu ======================//
    function handelOpenOptionsMenu(){
        if(optionsRef.current.style.display=="none"){
            optionsRef.current.style.display="flex"
        }else{
            optionsRef.current.style.display="none"
        }
    }

    // ================== subTasks count & subTasks ended count ===============//
    let subTasksCount = 0
    let subTasksEnded = 0 
    task?.subTasks?.forEach(() => {
        subTasksCount++
    });
    
    task?.subTasks?.forEach((subTask) => {
        if(subTask.checked==true){
            subTasksEnded++
        }
        
    });
   
    return(
        <>
            
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >
            {/* =================  menu ========== */}
                    <div ref={menuRef} style={{display:"none"}} className={modal.menu} >
                            <span onClick={handelEditTaskBtn}  >Edit Task</span>
                            <span onClick={handelDeleteBtn} >Delete Task</span>
                        </div>
            {/*============ title container ============   */}
                    <div className={modal.titleContainer} >
                        <h3  className={modal.title}>{task?.title} </h3>
                        <i onClick={handelToggle} className="material-symbols-outlined">more_vert</i>
                    </div>
            
            {/* ================== description ============= */}
                    <p className={modal.description} > {task?.desc}</p>
                    
                    
                    <div className={modal.multiInput}>
            {/* =========== Subtasks checkBox =========  */}
                        <span style={{marginBottom:"20px"}} >Subtasks ({subTasksEnded}of {subTasksCount})</span>
                        {task?.subTasks?.map((subTask,index)=>
                            <label key={index} className={modal.checkBox}>
                                <input 
                                    onChange={(e)=>{
                                        const newSubTasks= task.subTasks 
                                        const index = task.subTasks.findIndex((value)=>{return value.id==subTask.id})
                                        newSubTasks[index].checked= e.target.checked
                                        dispatch({
                                            type:"subTaskChecked",
                                            data:{
                                                boardId:currentElementId.boardId,
                                                columnId:currentElementId.columnId,
                                                taskId:currentElementId.taskId,
                                                subTasks:newSubTasks
                                            }
                                        })
                                    }} 
                                    checked={subTask.checked}  type='checkbox'/>
                                <label className={modal.box}/>
                                <span >{subTask.name}</span>
                            </label>
                        )}
                        
                        
                        
            {/* =========== Select menu ============= */}
                        <span style={{marginTop:"40px"}}  >Current Column</span>

                        <div onClick={handelOpenOptionsMenu} className={modal.select} > 
                            <span> column 1 </span>
                            <i className="material-symbols-outlined">keyboard_arrow_down</i>
                        </div>

                        <div ref={optionsRef} style={{display:"none"}} className={modal.options} >
                            {board?.columns?.map((column,index)=>
                                <label key={index} className={modal.optionsRadio}>
                                    <input 
                                    checked={column.id==currentElementId.columnId} 
                                    onChange={(e)=>{
                                        dispatch({
                                            type:"currentColumnId",
                                            data:e.target.value
                                        })
                                        dispatch({
                                            type:"changeTaskColumn",
                                            data:{
                                                boardId:currentElementId.boardId,
                                                columnId:currentElementId.columnId,
                                                taskId:currentElementId.taskId,
                                                newColumnId:e.target.value,
                                                task:task
                                            }
                                        })
                                        
                                    }}  
                                    value={column.id}  
                                    type='radio' 
                                    name='radio' />
                                    <label className={modal.colorBox}/>
                                    <span >{column.name}</span>
                                </label>
                            )}
                                

                        </div>

                        
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default TaskCardModal