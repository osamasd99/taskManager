import { useRef } from 'react'
import sideBar from './SideBar.module.css'
import { useDispatch } from 'react-redux'



function SideBar(){
    const sideBarRef = useRef()
    const visibilityButtonRef = useRef()
    const dispatch =useDispatch()
    
    
    function handelBtnCreate(){
        dispatch({
            type:"openModalUpdate",
            data:"newBoardModal",
        })
    }
    
    function handelSideBarVisibilty(){
        if (sideBarRef.current.style.display!="none"){
            sideBarRef.current.style.display="none"
            visibilityButtonRef.current.style.display="block"
        }else {
            sideBarRef.current.style.display="flex"
            visibilityButtonRef.current.style.display="none"
        }
    }
    return(
        <>
            <div ref={sideBarRef} className={sideBar.container} >
                
                <h1 className={sideBar.title}>tasksManager</h1>
        {/*============== Boards Names Container ================= */}
                <div className={sideBar.boardNamesContainer}>
                    <h4> All Boards (1) </h4>
        {/*============= Created boards  Links =============   */}
                    <nav className={sideBar.boardName} >
                        <i className="material-symbols-outlined">space_dashboard</i>
                        <span>board name</span>
                    </nav>
        {/* ================================================= */}
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
                            <input type="checkbox"/>
                            <span className={sideBar .slider } ></span>
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