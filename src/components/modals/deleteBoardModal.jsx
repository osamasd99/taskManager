import { useEffect, useRef } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'

function DeleteBoardModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal)
    const modalRef= useRef()

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
                        <button className={modal.btnDelete} >Delete</button>
                        <button className={modal.btnCancel} >Cancel</button>
                    </div>
                </div>
                    

            </div>
        
        </>
    )
}

export default DeleteBoardModal