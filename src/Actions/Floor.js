import { CHANGE_SELECTED_TABLE } from "./Types";

//CHANGE_SELECTED_TABLE
export const changeSelectedTable = (table) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SELECTED_TABLE,
            payload: table
        })
    }
}