/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getCurrentBoard } from '../../functions/getCurrentElement';


function AddTaskModal(){
    const dispatch = useDispatch()
    const [subTasks,setSubTasks]=useState([])//  create columns data
    const openModal=useSelector(state=>state.openModal)// this state for targeting the modal  user open it 
    const teamBoards=useSelector(state=>state.teamBoards)
    const currentElementId =useSelector(state=>state.currentElementId)
    const board = getCurrentBoard(teamBoards, currentElementId.boardId)  
    const modalRef= useRef() // this ref used in close and open modal  
    const optionsRef =useRef() // this ref used in close and open the menu of column or the options 
    const titleRef=useRef()
    const descriptionRef=useRef() 
    const selectedOptionRef =useRef()
    const id = uuidv4()

    //================= handel open & close modal ============//
    useEffect(()=>{
        if(openModal=="addTaskModal"){
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
    // ================= add subtask ===================//
    function handelAddSubTask(){
        setSubTasks([...subTasks,{id:`${id}`,name:"",checked:false}])
        
    }
    // ========================= add task =====================//
    function handelAddTask(e){
  
        const columnId =document.querySelector('input[name="radio"]:checked').value
        e.preventDefault()
        dispatch({
            type:"addTask",
            data:{
                boardId:currentElementId.boardId,
                columnId:columnId,
                task:{id:id,title:titleRef.current.value,desc:descriptionRef.current.value,subTasks:subTasks}
            }
        })
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })
        descriptionRef.current.value=null
        titleRef.current.value=null
        setSubTasks([])
    }
    
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >
                    <h3 className={modal.title}> Add New Task </h3>
                    
                    <form onSubmit={handelAddTask} className={modal.multiInput}>
            {/* ========= input task name  ============== */}
                        <label className={modal.input}>
                            <span>Title</span>
                            <input ref={titleRef} required type="text" placeholder="e.g Board Name"  />
                        </label>
            {/* =========== input description ================= */}
                        <label className={modal.input}>
                            <span>Description</span>
                            <textarea ref={descriptionRef}  placeholder="e.g Task description"  />
                        </label>

                        <span>Subtasks</span>
            {/* =========== Subtasks multi  input field =========  */}
                        {subTasks.map((subtask,index)=>
                            <label key={index} className={modal.addedInput}>
                                <input  
                                    onChange={(e)=>{
                                        const newsubTasks = [...subTasks]
                                        const index=subTasks.findIndex((value)=>{return value.id==subtask.id})
                                        newsubTasks[index].name=e.target.value
                                        setSubTasks(newsubTasks)
                                    }}
                                    required 
                                    value={subtask.name} 
                                    type="text" 
                                    placeholder="e.g Subtask Name" /> 
                                <i 
                                onClick={()=>{ 
                                    const index=subTasks.findIndex((value)=>{return value.id==subtask.id})
                                    const newColumns = subTasks.toSpliced(index,1)
                                    setSubTasks(newColumns) 
                                }}  
                                className="material-symbols-outlined">close</i>
                            </label>
                        )}
                        <button onClick={handelAddSubTask} className={modal.btnWhite} > Add New Subtask </button>
            {/* =========== Select menu ============= */}
                        <span>Select Column</span>

                        <div onClick={handelOpenOptionsMenu} className={modal.select} > 
                            <span> Set Column </span>
                            <i className="material-symbols-outlined">keyboard_arrow_down</i>
                        </div>

                        <div ref={optionsRef} style={{display:"none"}} className={modal.options} >
                            {board?.columns?.map((column,index)=>

                                <label key={index}  className={modal.optionsRadio}>
                                    <input ref={selectedOptionRef}  value={column.id} required  type='radio' name='radio' />
                                    <label className={modal.colorBox}/>
                                    <span >{column.name}</span>
                                </label>
                            )}
                                
                            
                                
                        </div>

                        <button type='submit' className={modal.btnPurple}> Create Task</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default AddTaskModal