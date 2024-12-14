import dashBoard from './dashBoard.module.css'

function DashBoard(){
    document.body.classList="darkMode"
    return(
        <>
            <div className={dashBoard.container} >
                <h1>taskManager</h1>
                <h2>YOUR TEAMS OR PROJECTS</h2>
                <div className={dashBoard.cardsContainer} >
                    <div className={dashBoard.card}>
                        <span>
                            <i className="material-symbols-outlined">workspaces</i>
                        </span>
                        <p>Marketing Team</p>
                    </div>
                    <div className={dashBoard.card}>
                        <span>
                            <i className="material-symbols-outlined">workspaces</i>
                        </span>
                        <p>Programming Team</p>
                    </div>
                    <div className={dashBoard.card}>
                        <span>
                            <i className="material-symbols-outlined">workspaces</i>
                        </span>
                        <p>Selkit Project </p>
                    </div>
                    <div className={dashBoard.addCard}>
                        <i  className="material-symbols-outlined">add_circle</i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard