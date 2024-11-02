/* eslint-disable react/prop-types */
import {  useEffect, useRef, useState } from "react"
import modal from "./modal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

function CreateNewBoardModal(){
    const dispatch = useDispatch()
    const [column,setcolumn]=useState([])//  create columns data
    const openModal=useSelector(state=>state.openModal) //  state for targeting the modal user open it
    const modalRef= useRef()// this use  in close &open modal 
    const boardNameRef=useRef()// this ref use to get value of the input of board name
    const id = uuidv4()

    // ============= handel open & close modal ============ //
    useEffect(()=>{
        if(openModal=="newBoardModal"){
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
        setcolumn([...column,{id:`${id}`,name:"",tasks:[]}])
        
    }
    // ================= create new baord ============== //
    function handelCreateBoard(e){
        e.preventDefault()
        
        dispatch({
            type:"createNewBoard",
            data:{id:`${id}`,name:boardNameRef.current.value,columns:column}
        })
        dispatch({
            type:"currentBoardId",
            data:`${id}`
        })
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })
        boardNameRef.current.value=null
        setcolumn([])
    }

    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >

                    <h3 className={modal.title} > Add New Board </h3>
            {/* ==============   board name input ==============  */}
                    
                    <form onSubmit={handelCreateBoard}  className={modal.multiInput}>
                        <label className={modal.input}>
                            <span>Board Name</span>
                            <input ref={boardNameRef} required type="text" placeholder="e.g Board Name"   />
                        </label>
                        <span>Columns</span>
            {/* =========  column name  multi  input filed =========== */}
                    {column.map((col,index)=>
                        <label key={index} className={modal.addedInput}>
                            <input
                                onChange={(e)=>{
                                    const newColumns = [...column]
                                    const index=column.findIndex((value)=>{return value.id==col.id})
                                    newColumns[index].name=e.target.value
                                    setcolumn(newColumns)
                                }}
                                required 
                                value={col.name} 
                                type="text" 
                                placeholder="e.g Column Name" />
                            <i 
                            onClick={()=>{ 
                                const index=column.findIndex((value)=>{return value.id==col.id})
                                const newColumns = column.toSpliced(index,1)
                                setcolumn(newColumns) 
                            }} 
                            className="material-symbols-outlined">close</i>
                        </label>
                    )}
                        <button onClick={handelAddColumn} className={modal.btnWhite} > Add New Column </button>
                        <button type="submit" className={modal.btnPurple}  > Create Board</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewBoardModal