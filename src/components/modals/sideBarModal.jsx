import { useDispatch, useSelector } from 'react-redux'
import modal from './modal.module.css'
import { useEffect, useRef, useState } from 'react'


function SideBarModal(){
    const dispatch =useDispatch()
    const openModal=useSelector(state=>state.openModal)// to select the open modal 
    const teamBoards =useSelector(state=>state.teamBoards)// team data state
    const currentElementId =useSelector(state=>state.currentElementId) // return id of  the selected element  
    const [mode,setMode]=useState(localStorage.getItem("theme")||"darkMode")// set initial value for mode  
    const modalRef= useRef()
// ============ handel open &close modal  ==================// 
    useEffect(()=>{
        if(openModal=="sideBarModal"){
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
// =============  open create board modal =============
    function handelBtnCreate(){
        dispatch({
            type:"openModalUpdate",
            data:"newBoardModal",
        })
    }
      // ============= mode switch  dark light  ===================//

    // func to update state and local storge  
    function handelModeSwitch(e){
        if(e.target.checked==true){
            setMode("lightMode")
            localStorage.setItem("theme","lightMode")
        }else{
            setMode("darkMode")
            localStorage.setItem("theme","darkMode")
            
        }
    }
    // update theme or mode by using mode state //
    useEffect(()=>{
        document.body.classList=mode
    },[mode])
    return(
        <>
            <div ref={modalRef} onClick={handelCloseModal} className={modal.backContainer} >
                <div className={modal.container} >
                    

                    <div className={modal.multiInput}>
                            <h4> All Boards ({teamBoards.length}) </h4>
                {/*============= Created boards  Links =============   */}
                {teamBoards.map((board,index)=>
                    <nav key={index} onClick={()=>{ dispatch({ type:"currentBoardId",data:board.id}) }}  className={currentElementId.boardId!=board.id?modal.boardName:modal.activeBoardName}  >
                        <i className="material-symbols-outlined">space_dashboard</i>
                        <span>{board.name}</span>
                    </nav>
                )}
                            
                {/* ================================================= */}
                            <button  onClick={handelBtnCreate} className={modal.btnCreate}>
                                <i className="material-symbols-outlined">add_circle</i>
                                <span>Create New Board</span>
                            </button>
                        
                {/* ============ Switch Button ============= */}
                        <div className={modal.switchMode}>
                            <div className={modal.switchModeButton} >
                                <i className="material-symbols-outlined">
                                    dark_mode
                                </i>
                                <label className={modal.switch}>
                                    <input onChange={handelModeSwitch} checked={mode=="darkMode"?false:true} type="checkbox"/>
                                    <span className={modal.slider } ></span>
                                </label>
                                <i className="material-symbols-outlined">
                                    light_mode
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBarModal