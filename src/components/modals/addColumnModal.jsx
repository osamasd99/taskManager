/* eslint-disable react/prop-types */
import {  useEffect, useRef, useState } from "react"
import modal from "./modal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { getCurrentBoard } from "../../functions/getCurrentElement";


function AddColumnModal(){
    const dispatch = useDispatch()
    const teamBoards =useSelector(state=>state.teamBoards) //all boards data
    const openModal=useSelector(state=>state.openModal) //   to select the open  modal 
    const currentElementId =useSelector(state=>state.currentElementId)  // return the id of the element we select     
    const board = getCurrentBoard(teamBoards,currentElementId.boardId)
    const [column,setColumn]=useState([])//  create columns data
    const modalRef= useRef()
    const id = uuidv4()
    
    // ============ handel  open & close modal
    useEffect(()=>{
        if(openModal=="addColumnModal"){
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
     // ================= add new Column ================ //
    
    
    function handelAddColumn(){
        setColumn([...column,{id:`${id}`,name:"",tasks:[]}])
        
    }
    // ================= create new baord ============== //
    function handelCreateColumn(e){
        e.preventDefault()

        dispatch({
            type:"addColumn",
            data:{boardId:currentElementId.boardId,column:column}
        })
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })
        setColumn([])
    }
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >

                    <h3 className={modal.title} > Add New Board </h3>
                    <form onSubmit={handelCreateColumn} className={modal.multiInput}>
            {/* =============== input  board name  =============== */}

                        <label className={modal.input}>
                            <span>Board Name</span>
                            <input style={{cursor:"not-allowed",color:"var(--subtitleColor)"}} disabled type="text" placeholder="e.g Board Name" value={board?.name}  />
                        </label>
             {/* ============== multi input column name =============== */}
                            <span>Columns</span>
                            {board?.columns?.map((col,index)=>
                                <label key={index} className={modal.addedInput}>
                                    <input style={{cursor:"not-allowed",color:"var(--subtitleColor)"}} disabled type="text" value={col.name} />
                                    <i style={{cursor:"not-allowed"}}className="material-symbols-outlined">close</i>
                                </label>
                            )}
                            
                            {column.map((col,index)=>
                                <label key={index} className={modal.addedInput}>
                                    <input
                                        onChange={(e)=>{
                                            const newColumns = [...column]
                                            const index=column.findIndex((value)=>{return value.id==col.id})
                                            newColumns[index].name=e.target.value
                                            setColumn(newColumns)
                                            
                                        }}
                                        required 
                                        value={col.name} 
                                        type="text" 
                                        placeholder="e.g Column Name" />
                                    <i 
                                    onClick={()=>{ 
                                        const index=column.findIndex((value)=>{return value.id==col.id})
                                        const newColumns = column.toSpliced(index,1)
                                        setColumn(newColumns) 
                                    }} 
                                    className="material-symbols-outlined">close</i>
                                </label>
                            )}
                        
                        <button onClick={handelAddColumn} className={modal.btnWhite} > Add New Column </button>
                        <button type="submit" className={modal.btnPurple}  > Create Column</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddColumnModal