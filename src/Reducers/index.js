import { combineReducers } from 'redux';
import book from "./Book"
import navbar from "./Navbar"
import slot from "./Slot"
import guest from './Guest'
import status from "./Status";
import table from "./Table";

export default combineReducers({
    book,
    navbar,
    slot,
    guest,
    status,
    table
})