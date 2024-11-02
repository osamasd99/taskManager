
// this state use to store  the id of the board or task we use it now or we need to update it now
// in every open for board we store the id of it to get the correct board in Board component 
// the same think doing in another element like task , column , subtask
// we get the data of it in modal instead of pass props
// so we can not store more than one id for the same element type in same time    
const currentElementId =(state={boardId:false,columnId:false,taskId:false,subTaskId:false},action)=>{
    if(action.type=="currentBoardId"){
        return state={...state,boardId:action.data}
    }else if (action.type=="currentColumnId"){
        return state={...state,columnId:action.data}
    }else if (action.type=="currentTaskId"){
        return state={...state,taskId:action.data}
    }else if (action.type=="currentSubTaskId"){
        return state={...state,subTaskId:action.data}
    }

    return state
}

export default currentElementId