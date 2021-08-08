import { GET_STATUSES } from "../Actions/Types";

const initialState = {
    statuses: [],
}

export default function status(state = initialState, action) {
    switch(action.type) {
        case GET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
            }

        default:
            return state
    }
}