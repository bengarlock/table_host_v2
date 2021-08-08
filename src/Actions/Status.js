import {GET_STATUSES} from "./Types";

//GET_STATUSES
export const getStatuses = () => {
    return async (dispatch) => {

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/status/")
        let statuses = await response.json()

        dispatch({
            type: GET_STATUSES,
            payload: statuses
        })
    };
}