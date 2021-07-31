import { CHANGE_NAVBAR } from "../Actions/Types";

const initialState = {
    currentNavbar: 'home',
}

export default function (state = initialState, action) {
    switch(action.type) {
        case CHANGE_NAVBAR:
            return {
                ...state,
                currentNavbar: action.payload,
            }

        default:
            return state
    }
}