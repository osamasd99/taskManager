/* eslint-disable react/prop-types */
import {  useDispatch, useSelector } from 'react-redux'
import boardCanvas from './boardCanva.module.css'
import { getCurrentBoard } from '../../../functions/getCurrentElement'



function TaskCard({task,columnId}){
    const dispatch =useDispatch()
    let subTaskCount=0
    
    task?.subTasks?.forEach(() => {
        subTaskCount=subTaskCount+1
    });
    let subTasksEnded=0
    task?.subTasks?.forEach((subTask) => {
        if(subTask.checked==true){
            subTasksEnded=subTasksEnded+1
        }
        
    });
    
    
    function handelCardClick(){
        dispatch({
            type:"openModalUpdate",
            data:"taskCardModal"
        }) 
        dispatch({
            type:"currentTaskId",
            data:task.id
        }) 
        dispatch({
            type:"currentColumnId",
            data:columnId
        })   
    }
    
    return(
        <> 
            <div  onClick={handelCardClick} className={boardCanvas.taskCard}  >
                <h3>{task?.title}</h3>
                <p>{subTasksEnded} of {subTaskCount} subtasks</p>
            </div>

        </>
    )
}


function CreatedColumns(){
    const teamBoards =useSelector(state=>state.teamBoards )
    const currentElementId =useSelector(state=>state.currentElementId)
    const board = getCurrentBoard(teamBoards, currentElementId.boardId)  
    
    return (
        <>  
            {board?.columns?.map((column,index)=>{
                console.log(column.tasks)
            return  <div key={index} className={boardCanvas.column}>
                        <p> <i className="material-symbols-outlined">radio_button_checked</i>{column.name} </p>
                        {column.tasks.length==0 ?<div style={{display:"block"}} className={boardCanvas.columnContent} ></div>:column.tasks.map((task,index) => {   
                            return <TaskCard key={index} columnId={column.id} task={task}  />
                            })}
                    </div>
        })}
        </>
    )
}
function AddColumnBtn(){
    const dispatch =useDispatch()
    function handelAddColumn(){
        
        dispatch({
            type:"openModalUpdate",
            data:"addColumnModal"
        })
        
    }

    return(
        <>  
            <div onClick={handelAddColumn} className={boardCanvas.addColumnBtn} >
                <i className="material-symbols-outlined">add</i>
                <span>New Column</span>
            </div>
        </>
    )
}
function BoardCanvas( ){
    
    return(
        <>  
            <div  className={boardCanvas.backGround} >
                    <CreatedColumns />
                    <AddColumnBtn/>
                    
            </div>
            
        </>
    )
}

export default BoardCanvas