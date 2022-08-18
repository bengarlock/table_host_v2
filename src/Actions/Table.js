import {PATCH_TABLE, CHANGE_SELECTED_TABLE, SET_TABLES} from "./Types";

//PATCH TABLES
export const patchTable = (table) => {
    return async (dispatch) => {

        const packet = {
            method: "put",
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify({
                class_name: table.class_name,
                left: table.left,
                top: table.top,
                name: table.name,
                status: table.status.id,
                width: table.width,
                height: table.height,
                background_color: table.background_color,
                border: table.border,
                reservation: table.reservation ? table.reservation.id : null
            })
        }

        const response = await fetch(`https://bengarlock.com/api/v1/tablehost/tables/${table.id}/`, packet)
        let updatedTable = await response.json()

        dispatch({
            type: PATCH_TABLE,
            payload: updatedTable
        })
    };
}

//CHANGE_SELECTED_TABLE
export const changeSeatedTable = (table) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SELECTED_TABLE,
            payload: table
        })
    }
}
