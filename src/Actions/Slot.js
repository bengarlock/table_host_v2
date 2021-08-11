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
        const packet = {
            method: "put",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                booked: slot.booked,
                time: slot.time,
                party_size: slot.party_size,
                status: slot.status,
                reservation_notes: slot.reservation_notes,
                tables: slot.tables,
                book: slot.book,
                guest: guest.id,
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

