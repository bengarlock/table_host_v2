import { GET_BOOK } from "./Types";
import { SET_DATE} from "./Types";

//GET BOOK
export const getBook = (date) => {
    return async (dispatch) => {

        const formatDate = (date) => {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        }

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/books/?date=" + String(formatDate(date)))
        let book = await response.json()

        dispatch({
            type: GET_BOOK,
            payload: book
        })
    };
}

export const setDate = (date) => {
    return (dispatch) => dispatch({
        type: SET_DATE,
        payload: date
    })

}