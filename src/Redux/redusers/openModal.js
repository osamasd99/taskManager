// this state to target the modal opened now 

const openModal =(state="",action)=>{
    if (action.type=="openModalUpdate"){
        return state=action.data
    }
    return state   
}


export default openModal