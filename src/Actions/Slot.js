import {CHANGE_SLOT, PATCH_SLOT} from "./Types";

//CHANGE_SLOT
export const changeSlot = (slot) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SLOT,
            payload: slot
        })
    }
}

//PATCH_SLOT
export const patchSlot = (slot, guest) => {
    return async (dispatch) => {

        console.log(guest.id)

        const packet = {
            method: "put",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                book: slot.book,
                guest: guest.id
            })
        }

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/slots/" + String(slot.id) + "/", packet)
        let updatedSlot = await response.json()

        dispatch({
            type: PATCH_SLOT,
            payload: updatedSlot
        })
    };
}

