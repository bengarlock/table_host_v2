//reducers evaluate actions and return state based off that action.
import { GET_BOOK, PATCH_BOOK } from "../Actions/Types";
import { SET_DATE} from "../Actions/Types";

const initialState = {
    currentBook: {},
    currentDate: ''
}

export default function book(state = initialState, action) {
    switch(action.type) {
        case GET_BOOK:
            return {
                ...state,
                currentBook: action.payload,
            }
        case SET_DATE:
            return {
                ...state,
                currentDate: action.payload
            }

        case PATCH_BOOK:
            return {
                ...state,
                currentBook: action.payload
            }

        default:
            return state
    }
}