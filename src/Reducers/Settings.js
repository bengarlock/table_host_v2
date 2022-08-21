import { GET_SETTINGS } from "../Actions/Types";

const initialState = {
    settings: {}
}

export default function guest(state = initialState, action) {
    switch(action.type) {
        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
            }

        default:
            return state
    }
}