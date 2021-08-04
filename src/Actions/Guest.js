import {CHANGE_GUEST, PATCH_GUEST, CREATE_GUEST} from "./Types";

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

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/guest/" + String(guest.id))
        let updatedSlot = await response.json()

        dispatch({
            type: PATCH_GUEST,
            payload: updatedSlot
        })
    };
}

//CREATE_GUEST
export const createGuest = (guest) => {
    return async (dispatch) => {

        let data = {
            first_name: guest.split(' ').slice(0, -1).join(' '),
            last_name: guest.split(' ').slice(-1).join(' '),
            phone_number: guest.phone_number,
            guest_notes: guest.guest_notes,
        }

        let packet = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/guests/", packet)
        let newGuest = await response.json()

        dispatch({
            type: CREATE_GUEST,
            payload: [newGuest]
        })
    };
}

