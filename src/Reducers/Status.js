import {GET_STATUSES, RENDER_STATUS_FORM} from "../Actions/Types";

const initialState = {
    statuses: [],
    renderStatusForm: false
}

export default function status(state = initialState, action) {
    switch(action.type) {
        case GET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
            }

        case RENDER_STATUS_FORM :{
            return {
                ...state,
                renderStatusForm: action.payload
                }
            }

        default:
            return state
    }
}