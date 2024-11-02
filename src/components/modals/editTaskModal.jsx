import { useEffect, useMemo, useRef, useState } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentBoard, getCurrentTask } from '../../functions/getCurrentElement'
import { v4 as uuidv4 } from 'uuid';

function EditTaskModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal)
    const teamBoards =useSelector(state=>state.teamBoards) // all boards data
    const currentElementId=useSelector(state=>state.currentElementId)// to get the current element id we work on it 
    const board = getCurrentBoard(teamBoards,currentElementId.boardId)
    const task =getCurrentTask(teamBoards,currentElementId.boardId,currentElementId.columnId,currentElementId.taskId)
    const [subTasks,setSubTasks]=useState(task?.subTasks)
    const[title,setTitle]=useState(task?.title)
    const[description,setDescription]=useState(task?.desc)
    const [newColumnId,setNewColumnId]=useState(currentElementId?.columnId)
    const modalRef= useRef()
    const optionsRef =useRef()
    const id = uuidv4()
//======================================// 
    useMemo(()=>{
        setTitle(task?.title)
        setDescription(task?.desc)
        setSubTasks(task?.subTasks)
        setNewColumnId(currentElementId.columnId)
    },[task,currentElementId])

    //================= handel open & close modal ============//
    useEffect(()=>{
        if(openModal=="editTaskModal"){
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

    //======================= open select menu ======================//
    function handelOpenOptionsMenu(){
        if(optionsRef.current.style.display=="none"){
            optionsRef.current.style.display="flex"
        }else{
            optionsRef.current.style.display="none"
        }
    }
    //=============== add new subtask  ====================//
    function handelNewSubTask(){
        setSubTasks([...subTasks,{id:`${id}` ,name:"",checked:false }])
    }
// ==================== save Changes ============== //
function handelSaveChanges(e){
    e.preventDefault()
    dispatch({
        type:"editTask",
        data:{
            boardId:currentElementId.boardId,
            columnId:currentElementId.columnId,
            taskId:currentElementId.taskId,
            newColumnId:newColumnId,
            task:{...task,title:title,desc:description,subTasks:[...subTasks]}
        }
    })
    dispatch({
        type:"openModalUpdate",
        data:"none"
    })
    dispatch({
        type:"currentTaskId",
        data:false
    })
}

    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >
                    <h3 className={modal.title}> Add New Task </h3>
            
                    
                    <form onSubmit={handelSaveChanges} className={modal.multiInput}>
            {/* ============== task name  input  =========== */}
                        <label className={modal.input}>
                            <span>Title</span>
                            <input required onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder=" Board Name"  />
                        </label>
            {/* =============== description input ================ */}
                        <label className={modal.input}>
                            <span>Description</span>
                            <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description}  placeholder=" Task description"  />
                        </label>        

                        <span>Subtasks</span>
            {/* =========== Subtasks input field =========  */}
                    {subTasks?.map((subTask,index)=>
                        <label key={index} className={modal.addedInput}>
                            <input
                            onChange={(e)=>{
                                const index = subTasks.findIndex((value)=>value.id==subTask.id)
                                const newSubTasks=[...subTasks]
                                newSubTasks[index].name=e.target.value
                                setSubTasks(newSubTasks)
                            }}
                                required value={subTask.name} type="text" placeholder="e.g " />
                            <i 
                            onClick={()=>{
                                const index = subTasks.findIndex((value)=>value.id==subTask.id)
                                const newSubTasks = subTasks.toSpliced(index,1)
                                setSubTasks(newSubTasks)
                            }} className="material-symbols-outlined">close</i>
                        </label>
                    )}
                        

                        <button onClick={handelNewSubTask}  className={modal.btnWhite} > Add New Subtask </button>
            {/* =========== Select menu ============= */}
                        <span>Select Column</span>

                        <div onClick={handelOpenOptionsMenu} className={modal.select} > 
                            <span> column 1 </span>
                            <i className="material-symbols-outlined">keyboard_arrow_down</i>
                        </div>

                        <div ref={optionsRef} style={{display:"none"}} className={modal.options} >
                            {board?.columns?.map((column,index)=>
                            <label key={index} className={modal.optionsRadio}>
                                <input required 
                                onChange={(e)=>{
                                    setNewColumnId(e.target.value)
                                }} 
                                checked={column.id==newColumnId} value={column.id}  type='radio' name='radio' />
                                <label className={modal.colorBox}/>
                                <span >{column.name}</span>
                            </label>
                            )}
                                
                        </div>

                        <button type='submit' className={modal.btnPurple}> Save Changes</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default EditTaskModal