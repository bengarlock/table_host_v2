import { GET_SETTINGS } from "./Types";
import {endpoint} from "../endpoint";

// GET_SETTINGS
export const getSettings = () => {
    return async (dispatch) => {

        const response = await fetch(endpoint + "v1/tablehost/settings/")
        let settings = await response.json()

        dispatch({
            type: GET_SETTINGS,
            payload: settings[0]
        })
    };
}