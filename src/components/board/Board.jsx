import board from './Board.module.css'
import BoardNav from './boardNav/boardNav'

function Board(){
    return(
        <>
            <div className={board.container} >
                <BoardNav/>
            </div>
        </>
    )
}

export default Board