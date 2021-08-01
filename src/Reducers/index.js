import { combineReducers } from 'redux';
import book from "./Book"
import navbar from "./Navbar"
import slot from "./Slot"

export default combineReducers({
    book,
    navbar,
    slot
})