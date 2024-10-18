import { useEffect, useRef } from 'react'
import modal from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'

function AddTaskModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal)
    const modalRef= useRef()

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
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}} className={modal.backContainer}>
                <div className={modal.container} >
                    <h3 className={modal.title}> Add New Task </h3>

                    <label className={modal.input}>
                        <span>Title</span>
                        <input type="text" placeholder="e.g Board Name"  />
                    </label>

                    <label className={modal.input}>
                        <span>Description</span>
                        <textarea  placeholder="e.g Task description"  />
                    </label>
                    
                    <div className={modal.multiInput}>

                        <span>Subtasks</span>
            {/* =========== Subtasks input field =========  */}
                        <label className={modal.addedInput}>
                            <input type="text" placeholder="e.g " />
                            <i className="material-symbols-outlined">close</i>
                        </label>

                        <button className={modal.btnWhite} > Add New Subtask </button>
            {/* =========== Select menu ============= */}
                        <span>Select Column</span>

                        <div className={modal.select} > 
                            <span> column 1 </span>
                            <i className="material-symbols-outlined">keyboard_arrow_down</i>
                        </div>

                        <div className={modal.options} >
                                <label className={modal.optionsCheckBox}>
                                    <input  type='radio' name='radio' />
                                    <label className={modal.colorBox}/>
                                    <span >Board Name</span>
                                </label>
                        </div>

                        <button className={modal.btnPurple}> Create Board</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddTaskModal