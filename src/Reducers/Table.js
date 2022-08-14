import {CHANGE_SEATED_TABLE, SET_TABLES} from "../Actions/Types"


const initialState = {
    currentTable: {},
    tables: []
}

export default function status(state = initialState, action) {
    switch(action.type) {

        case CHANGE_SEATED_TABLE:
            return {
                ...state,
                currentTable: action.payload,
            }

        default:
            return state
    }
}