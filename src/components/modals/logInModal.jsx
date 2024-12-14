import { useDispatch, useSelector } from 'react-redux'
import modal from './modal.module.css'
import { useEffect, useRef } from 'react'

function LogInModal(){
    const dispatch = useDispatch()
    const openModal=useSelector(state=>state.openModal) //  state for targeting the modal user open it
    const modalRef= useRef()// this use  in close &open modal 
    // ============= handel open & close modal ============ //
    useEffect(()=>{
        if(openModal=="logInModal"){
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
    return  (
        <>
            <div ref={modalRef} onClick={handelCloseModal} style={{display:"none"}}  className={modal.backContainer} >
                <div className={modal.container}>
                <h3 className={modal.title} > Log In</h3>
                <form  className={modal.multiInput}>
                    <label className={modal.input}>
                        <span> Email</span>
                        <input  required type="email"   />
                    </label>
                    <label className={modal.input}>
                        <span> Password</span>
                        <input  required type="Password"   />
                    </label>
                    <button type='submit' className={modal.btnPurple} >Log In</button>
                </form>
                </div>
            </div>
        </>
    )
}

export default LogInModal