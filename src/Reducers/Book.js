//reducers evaluate actions and return state based off that action.
import { GET_BOOK } from "../Actions/Types";

const initialState = {
    currentBook: [],
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_BOOK:
            return {
                ...state,
                currentBook: action.payload,
            }

        default:
            return state
    }
}