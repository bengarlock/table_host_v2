import { CHANGE_SLOT, SEATED_SLOT } from "../Actions/Types";

const initialState = {
    currentSlot: {},
    seatedSlot: {}
}

export default function slot(state = initialState, action) {
    switch(action.type) {
        case CHANGE_SLOT:
            return {
                ...state,
                currentSlot: action.payload,
            }
        case SEATED_SLOT:
            return {
                ...state,
                seatedSlot: action.payload,
            }

        default:
            return state
    }
}