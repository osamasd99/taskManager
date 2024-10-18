/* eslint-disable react/prop-types */
import {  useEffect, useRef } from "react"
import modal from "./modal.module.css"
import { useDispatch, useSelector } from "react-redux"

function CreateNewBoardModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal)
    const modalRef= useRef()
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
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >

                    <h3 className={modal.title} > Add New Board </h3>
                    
                    <label className={modal.input}>
                        <span>Board Name</span>
                        <input type="text" placeholder="e.g Board Name"  />
                    </label>

                    <div className={modal.multiInput}>
                        <span>Columns</span>

                        <label className={modal.addedInput}>
                            <input type="text" placeholder="e.g Column Name" />
                            <i className="material-symbols-outlined">close</i>
                        </label>

                        <button className={modal.btnWhite} > Add New Column </button>
                        <button className={modal.btnPurple}  > Create Board</button>
                    </div>
                    

                </div>
            </div>
        </>
    )
}

export default CreateNewBoardModal