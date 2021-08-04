import { CHANGE_GUEST, CREATE_GUEST } from "../Actions/Types";

const initialState = {
    currentGuest: [],
}

export default function guest(state = initialState, action) {
    switch(action.type) {
        case CHANGE_GUEST:
            return {
                ...state,
                currentGuest: action.payload,
            }

        case CREATE_GUEST:
            return {
                ...state,
                currentGuest: action.payload,
            }


        default:
            return state
    }
}