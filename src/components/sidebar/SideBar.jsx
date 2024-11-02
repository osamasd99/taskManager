import { useEffect, useRef, useState } from 'react'
import sideBar from './SideBar.module.css'
import { useDispatch, useSelector } from 'react-redux'




function SideBar(){
    const sideBarRef = useRef()
    const visibilityButtonRef = useRef()
    const [mode,setMode]=useState(localStorage.getItem("theme")||"darkMode")// set initial value for mode  
    const teamBoards =useSelector(state=>state.teamBoards)
    const currentElementId =useSelector(state=>state.currentElementId)
    const dispatch =useDispatch()
    
    // ======= open create board modal ============== //
    function handelBtnCreate(){
        dispatch({
            type:"openModalUpdate",
            data:"newBoardModal",
        })
    }
    // ===========  handel hide sidebar button ===============//
    function handelSideBarVisibilty(){
        if (sideBarRef.current.style.display!="none"){
            sideBarRef.current.style.display="none"
            visibilityButtonRef.current.style.display="block"
        }else {
            sideBarRef.current.style.display="flex"
            visibilityButtonRef.current.style.display="none"
        }
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
            <div ref={sideBarRef} className={sideBar.container} >
                
                <h1 className={sideBar.title}>tasksManager</h1>
        {/*============== Boards Names Container ================= */}
                <div className={sideBar.boardNamesContainer}>
                    <h4> All Boards (1) </h4>
        {/*============= Created boards  Links =============   */}
                {teamBoards.map((board,index)=>
                    <nav key={index} 
                    onClick={()=>{ 
                        dispatch({ type:"currentBoardId",data:board.id}) 
                        dispatch({ type:"currentTaskId",data:false}) 
                        dispatch ({ type:"currentColumnId",data:false}) }}  
                    className={currentElementId.boardId!=board.id?sideBar.boardName:sideBar.activeBoardName}  >
                        <i className="material-symbols-outlined">space_dashboard</i>
                        <span>{board.name}</span>
                    </nav>
                )}

        {/* ========================Create New Board Btn========================= */}
                    <button  onClick={handelBtnCreate} className={sideBar.btnCreate}>
                        <i className="material-symbols-outlined">add_circle</i>
                        <span>Create New Board</span>
                    </button>
                </div>
        {/* ============ Switch Button ============= */}
                <div className={sideBar.switchMode}>
                    <div className={sideBar.switchModeButton} >
                        <i className="material-symbols-outlined">
                            dark_mode
                        </i>
                        <label className={sideBar.switch}>
                            <input  onChange={handelModeSwitch} checked={mode=="darkMode"?false:true}  type="checkbox"/>
                            <span className={sideBar.slider } ></span>
                        </label>
                        <i className="material-symbols-outlined">
                            light_mode
                        </i>
                    </div>
                </div>
        {/* =========== visibility_off Button ========== */}
                <div className={sideBar.hideSideBar} >
                    <button onClick={handelSideBarVisibilty} className={sideBar.hideSideBarButton}>
                        <i className="material-symbols-outlined">
                            visibility_off
                        </i> 
                        <span>Hide Sidebar</span>
                    </button>
                </div>
            </div>
        {/* ================= visibility_on Button ============= */}
            <button ref={visibilityButtonRef} onClick={handelSideBarVisibilty} style={{display:'none'}} className={sideBar.visibilityButton}>
                        <i className="material-symbols-outlined">
                            visibility
                        </i> 
            </button>
            
        </>
    )
}

export default SideBar