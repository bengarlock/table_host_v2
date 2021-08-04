import { CHANGE_SLOT } from "../Actions/Types";

const initialState = {
    currentSlot: [],
}

export default function slot(state = initialState, action) {
    switch(action.type) {
        case CHANGE_SLOT:
            return {
                ...state,
                currentSlot: action.payload,
            }

        default:
            return state
    }
}