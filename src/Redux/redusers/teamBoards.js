// this store for  all boards data

const teamBoards =(state=[
    {
        id:"42545",
        name:"marketing stratgy",
        columns:[
            {
                id:"4522452",
                name:"Target Audiance",
                color:"#000000",
                tasks:[
                    {
                        id:"78878",
                        title:"consaltant company 00",
                        desc:"",
                        subTasks:[
                            
                        ]
                    }
                ]
            }, {
                id:"1454545",
                name:"Target fss",
                color:"#000000",
                tasks:[
                    {
                        id:"5464",
                        title:"consaltant company 01",
                        desc:"this target Audiance suffring from some problems we write it in subTasks",
                        subTasks:[
                            {
                                id:"5645645",
                                name:"kkdflksf",
                                checked:false,
                            },
                            {
                                id:'45646',
                                name:"kkdflksf",
                                checked:true,
                            },
                            {
                                id:"4564556",
                                name:"kkdflksf",
                                checked:false,
                            }
                        ]
                    },
                    {
                        id:"adafsfs",
                        title:"consaltant company 01",
                        desc:"this target Audiance suffring from some problems we write it in subTasks",
                        subTasks:[
                            {
                                id:"423443",
                                name:"kkdflksf",
                                checked:false,
                            },
                            {
                                id:'45646',
                                name:"kkdflksf",
                                checked:true,
                            },
                            {
                                id:"4564556",
                                name:"kkdflksf",
                                checked:false,
                            }
                        ]
                    }
                ]
            }
        ]
    },{
        id:"32",
        name:"marketing 00",
        columns:[
            {
                id:"12",
                name:"Target 00",
                color:"#000000",
                tasks:[
                    {
                        id:"1121",
                        title:"consaltant 00",
                        desc:"this target Audiance suffring from some problems we write it in subTasks",
                        subTasks:[
                            {
                                id:"1222",
                                name:"kkdflksf",
                                checked:true,
                            },
                            {
                                id:"2121",
                                name:"kkdflksf",
                                checked:true,
                            },
                            {
                                id:"312",
                                name:"kkdflksf",
                                checked:true,
                            }
                        ]
                    }
                ]
            }, {
                id:"212",
                name:"Target 00",
                color:"#000000",
                tasks:[
                    {
                        id:"1454",
                        title:"consaltant 01",
                        desc:"this target Audiance suffring from some problems we write it in subTasks",
                        subTasks:[
                            {
                                id:"14545",
                                name:"kkdflksf",
                                checked:false,
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
    ,action)=>{
    if (action.type=="teamBoardsUpdate"){
        return action.data
    }
    else if(action.type=="createNewBoard"){
        return state = [...state,action.data]
    }
    else if(action.type=="editBoard"){
        return state.map((board)=>
            board.id===action.data.boardId?{...board,name:action.data.name,columns:action.data.column}:board
        )
    }
    else if(action.type=="addColumn"){
        return state.map((board)=>
            board.id===action.data.boardId?{...board,columns:[...board.columns,...action.data.column]}:board
        )
    }
    else if(action.type=="addTask"){
        return state.map((board)=>
            board.id===action.data.boardId?{...board,columns:board.columns.map((column)=>
                column.id===action.data.columnId?{...column,tasks:[...column.tasks,action.data.task]}:column
            )}:board
        )   
    }
    else if(action.type=="subTaskChecked"){
        return state.map((board)=>
            board.id===action.data.boardId?{...board,columns:board.columns.map((column)=>
                column.id===action.data.columnId?{...column,tasks:column.tasks.map((task)=>
                task.id==action.data.taskId?{...task,subTasks:action.data.subTasks}:task)

                }:column
            )}:board
        )   
    }
    else if(action.type=="changeTaskColumn"){
        return state.map((board)=>{
            if(board.id===action.data.boardId){
                return {...board,columns:board.columns.map((column)=>{
                    if(column.id===action.data.newColumnId){
                        return{...column,tasks:[...column.tasks,action.data.task]}
                    }else if(column.id===action.data.columnId){
                        return{...column,tasks:column.tasks.filter((task)=>{
                            if(task.id!=action.data.taskId){
                                return task
                            }
                        })}
                    }else{
                        return column
                    }
                })}
            }else{
                return board
            }
    })   
    }
        else if(action.type=="editTask"){
            
            return state.map((board)=>{
                return board.id===action.data.boardId?{...board,columns:board.columns.map((column)=>{
                    if(action.data.columnId==action.data.newColumnId){
                        return column.id===action.data.columnId?{...column,tasks:column.tasks.map((task)=>{
                            return task.id===action.data.taskId?action.data.task:task
                        })}:column
                    }else{
                        if(column.id===action.data.newColumnId){
                            return{...column,tasks:[...column.tasks,action.data.task]}
                        }else if(column.id===action.data.columnId){
                            return{...column,tasks:column.tasks.filter((task)=>{
                                if(task.id!=action.data.taskId){
                                    return task
                                }
                            })}
                        }else{
                            return column
                        } 
                    }
                })}:board
            })
    }
        else if(action.type=="deleteTask"){
            
            return state.map((board)=>{
                return  board.id=== action.data.boardId?{...board,columns:board.columns.map((column)=>{
                    return column.id===action.data.columnId?{...column,tasks:column.tasks.filter((task)=>{
                        return task.id!=action.data.taskId
                    })}:column
                })}:board
            })
    }
    
    return state   
}


export default teamBoards



