import { useEffect, useRef } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'


function DeleteTaskModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal)
    const currentElementId=useSelector(state=>state.currentElementId)// to get the current element id we work on it 
    const modalRef= useRef()
    //  =========== handel  open & close modal ==============  //
    useEffect(()=>{
        if(openModal=="deleteTaskModal"){
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
    function handelCancelBtn(){
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })
    }
    //==============   handel delete ===============//
    function handelDeleteBtn(){
        dispatch({
            type:"deleteTask",
            data:{
                boardId:currentElementId.boardId,
                columnId:currentElementId.columnId,
                taskId:currentElementId.taskId
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
                    <h3 className={modal.titleErorr}> Delete this Task? </h3>
                    <p className={modal.text} >
                        Are you sure you want to delete the ‘Platform Launch<br/>
                        board’? This action will removetask and<br/>
                        cannot be reversed.
                    </p>
                    <div className={modal.deleteButtonContainer} >
                        <button onClick={handelDeleteBtn} className={modal.btnDelete} >Delete</button>
                        <button onClick={handelCancelBtn} className={modal.btnCancel} >Cancel</button>
                    </div>
                </div>
                    

            </div>
        
        </>
    )
}

export default DeleteTaskModal