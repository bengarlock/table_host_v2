import { CHANGE_SELECTED_TABLE } from "../Actions/Types"


const initialState = {
    currentTable: {},
    tables: []
}

export default function status(state = initialState, action) {
    switch(action.type) {

        case CHANGE_SELECTED_TABLE:
            return {
                ...state,
                currentTable: action.payload,
            }

        default:
            return state
    }
}