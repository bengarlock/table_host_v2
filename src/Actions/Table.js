import { PATCH_TABLE } from "./Types";

//PATCH TABLES
export const updateTable = (table) => {
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
                status: table.status,
                width: table.width,
                height: table.height,
                background_color: table.background_color,
                border: table.border
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