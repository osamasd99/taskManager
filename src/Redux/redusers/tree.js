import { combineReducers } from "redux";
import openModal from "./openModal";
import teamBoards from "./teamBoards";
import currentElementId from "./currentElementId";





export const Tree = combineReducers( {
    teamBoards:teamBoards,
    openModal:openModal,
    currentElementId:currentElementId,

})