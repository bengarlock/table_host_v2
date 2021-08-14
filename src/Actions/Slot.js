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
export const patchSlot = (slot) => {
    return async (dispatch) => {

        const packet = {
            method: "put",
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(slot)
        }

        console.log("slot coming from frontend", slot)
        const response = await fetch("https://bengarlock.com/api/v1/tablehost/slots/" + String(slot.id) + "/", packet)
        let updatedSlot = await response.json()
        console.log(updatedSlot)

        dispatch({
            type: PATCH_SLOT,
            payload: updatedSlot
        })
    };
}

