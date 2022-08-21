import { endpoint } from "../endpoint";
import { GET_STATUSES, RENDER_STATUS_FORM } from "./Types";

//GET_STATUSES
export const getStatuses = () => {
    return async (dispatch) => {

        const response = await fetch(endpoint + "v1/tablehost/status/")
        let statuses = await response.json()

        statuses = statuses.sort((a,b) => a.order - b.order);

        dispatch({
            type: GET_STATUSES,
            payload: statuses
        })
    };
}

// RENDER_STATUS_FORM
export const changeRenderStatusForm = (status) => {
    return (dispatch) => {
        dispatch({
            type: RENDER_STATUS_FORM,
            payload: status
        })
    }
}