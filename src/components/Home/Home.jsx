
import { useDispatch } from 'react-redux'
import LogInModal from '../modals/logInModal'
import SignUpModal from '../modals/signUpModal'
import home from './Home.module.css'

function Home(){
    const dispatch=useDispatch()
        document.body.classList="darkMode"
    return(
        <>  
            <LogInModal/>
            <SignUpModal/>
            <div className={home.container} >
                <h1>taskManager</h1>
                <p>
                    Manage your company or your team ,using our<br/> task management app
                    Suitable for large and small teams
                </p>
                <div className={home.card1} >
                    <button onClick={()=>{dispatch({type:"openModalUpdate",data:"logInModal"})}} >Log in</button>
                    <button onClick={()=>{dispatch({type:"openModalUpdate",data:"signUpModal"})}}>Sign up</button>
                </div>
                
                <div className={home.card2} >
                    <h3> Company</h3>
                    <h3> Team  </h3>
                    <h3> Individual  </h3>
                </div>
                
            </div>
           
        </>
    )
}

export default Home