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

        function hasNumber(string) {
            return /\d/.test(string)
        }

        const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
            first.toLocaleUpperCase(locale) + rest.join('')

        function returnData(guest) {
            if (hasNumber(guest)) {
                let data = {
                    phone_number: guest
                }
                return data

            } else {
                let firstName = guest.split(' ').slice(0, -1).join(' ')
                let lastName = guest.split(' ').slice(-1).join(' ')

                let data = {
                    first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
                    last_name: lastName.charAt(0).toUpperCase() + firstName.slice(1),
                    phone_number: guest.phone_number,
                    guest_notes: guest.guest_notes,
                }
                return data
            }
        }

        let packet = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(returnData(guest))
        }

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/guests/", packet)
        let newGuest = await response.json()

        dispatch({
            type: CREATE_GUEST,
            payload: [newGuest]
        })
    };
}

