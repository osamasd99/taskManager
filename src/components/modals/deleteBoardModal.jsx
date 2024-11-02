import { useEffect, useRef } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'


function DeleteBoardModal(){
    const dispatch = useDispatch()
    const teamBoards =useSelector(state=>state.teamBoards)// all boards data
    const openModal=useSelector(state=>state.openModal) // to select the open modal  
    const currentElementId =useSelector(state=>state.currentElementId) // return id  of selected element  
    const modalRef= useRef()
// =============== handel open & close modal ================//
    useEffect(()=>{
        if(openModal=="deleteBoardModal"){
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
    function handelCancel(){
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })
    }
    // =============== handel Delete Board ================//
    function handelDeleteBoard(){
        
        const index =teamBoards.findIndex((value)=>{return value.id == currentElementId.boardId})
        const newTeamBoards=teamBoards.toSpliced(index,1)
        dispatch({
            type:"teamBoardsUpdate",
            data:newTeamBoards
        })
        dispatch({
            type:"currentBoardId",
            data:"0"
        })
        dispatch({
            type:"openModalUpdate",
            data:"none"
        })

    }
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >
                    <h3 className={modal.titleErorr}> Delete this Board? </h3>
                    <p className={modal.text} >
                        Are you sure you want to delete the ‘Platform Launch<br/>
                        board’? This action will remove all columns and tasks and<br/>
                        cannot be reversed.
                    </p>
                    <div className={modal.deleteButtonContainer} >
                        <button onClick={handelDeleteBoard} className={modal.btnDelete} >Delete</button>
                        <button onClick={handelCancel} className={modal.btnCancel} >Cancel</button>
                    </div>
                </div>
                    

            </div>
        
        </>
    )
}

export default DeleteBoardModal