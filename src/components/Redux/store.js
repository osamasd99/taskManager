import { createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { Tree } from "./redusers/tree";


const store = createStore(Tree,composeWithDevTools())

export default store