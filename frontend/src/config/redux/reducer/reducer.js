import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import homeReducer from "./homeReducer";
import createBlogReducer from "./createBlogReduce";

const reducer = combineReducers({ homeReducer, globalReducer, createBlogReducer })

export default reducer;