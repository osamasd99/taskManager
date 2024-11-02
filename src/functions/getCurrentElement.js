

//  this function to get current board by using the id of this board and the all the boards data   
export function getCurrentBoard(teamBoards,boardId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    return board 
}


export function getCurrentColumn(teamBoards,boardId,columnId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    let column = board.columns.find((value)=>{return value.id ==columnId})
    return column
}
export function getCurrentTask(teamBoards,boardId,columnId,taskId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    let column = board.columns.find((value)=>{return value.id ==columnId})
    let task =column.tasks.find((value)=>{return value.id ==taskId})
    return task
}