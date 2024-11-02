

//  this function to get current board by using the id of this board and the all the boards data   
export function getCurrentBoard(teamBoards,boardId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    return board 
}

//  this function to get current column by using the id of  board , id of column and  all the boards data   

export function getCurrentColumn(teamBoards,boardId,columnId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    let column = board.columns.find((value)=>{return value.id ==columnId})
    return column
}
//  this function to get current task by using the id of this board , id of column , id of task and  all the boards data   

export function getCurrentTask(teamBoards,boardId,columnId,taskId){
    let board = teamBoards.find((value)=>{ return value.id==boardId})
    let column = board.columns.find((value)=>{return value.id ==columnId})
    let task =column.tasks.find((value)=>{return value.id ==taskId})
    return task
}