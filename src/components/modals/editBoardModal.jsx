import { useDispatch, useSelector } from 'react-redux'
import modal from './modal.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getCurrentBoard } from '../../functions/getCurrentElement'
import { v4 as uuidv4 } from 'uuid';

function EditBoardModal(){
    const dispatch = useDispatch()
    const teamBoards =useSelector(state=>state.teamBoards) // all boards data
    const openModal=useSelector(state=>state.openModal) // this store to handel close & open Modal 
    const currentElementId =useSelector(state=>state.currentElementId) // to get the current element id we work on it 
    const board = getCurrentBoard(teamBoards,currentElementId.boardId) // function to get current board by id of this board
    const [column,setColumn]=useState(board?.columns) // column data  to make changes on it   
    const[boardName,setBoardName]=useState(board?.name) 
    const modalRef= useRef()
    const id = uuidv4()

    //======================================// 
    useMemo(()=>{
        setColumn(board?.columns)
        setBoardName(board?.name) 
    },[board,openModal])//we use open modal here  to force update when open and close 
    
    //  ============ handel open & close  modal  =========== //
    useEffect(()=>{
        if(openModal=="editBoardModal"){
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
     // ================= save changes baord ============== //
    function handelSaveChanges(e){
        e.preventDefault()
        dispatch({
            type:"editBoard",
            data:{boardId:currentElementId.boardId,name:boardName,column:column}
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

                    <h3 className={modal.title} > Edit Board </h3>

                    <form onSubmit={handelSaveChanges} className={modal.multiInput}>
                         {/* =========  input board name ==============  */}
                        <label className={modal.input}>
                            <span>Board Name</span>
                            <input
                            onChange={(e)=>{setBoardName(e.target.value)}}                            
                            type="text" placeholder="e.g Board Name" value={boardName} />
                        </label>
                        {/* ========== columns name  multinput field ==============   */}
                        <span>Columns</span>
                        {column?.map((col,index)=>
                            <label key={index} className={modal.addedInput}>
                                <input
                                onChange={(e)=>{
                                    // change column name  
                                    const newColumns = [...column]
                                    const index=column.findIndex((value)=>{return value.id==col.id})
                                    newColumns[index].name=e.target.value
                                    setColumn(newColumns)
                                    
                                }}
                                required 
                                value={col.name} type="text" placeholder="e.g Column Name" />
                                <i
                                onClick={()=>{ 
                                    // delete column
                                    const index=column.findIndex((value)=>{return value.id==col.id})
                                    const newColumns = column.toSpliced(index,1)
                                    setColumn(newColumns) 
                                }} 
                                className="material-symbols-outlined">close</i>
                            </label>
                        )}
                        <button onClick={handelAddColumn} className={modal.btnWhite} > Add New Column </button>
                        <button type='submit' className={modal.btnPurple}  > Save Changes</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default EditBoardModal