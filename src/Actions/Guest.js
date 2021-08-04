import {CHANGE_GUEST, PATCH_GUEST} from "./Types";

//CHANGE_GUEST
export const changeGuest = (guest) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_GUEST,
            payload: guest
        })
    }
}

//PATCH_GUEST
export const patchGuest = (guest) => {
    return async (dispatch) => {

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/books/?date=" + String(guest.id))
        let updatedSlot = await response.json()

        dispatch({
            type: PATCH_GUEST,
            payload: updatedSlot
        })
    };
}

