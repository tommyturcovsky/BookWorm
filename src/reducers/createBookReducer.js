import {combineReducers} from 'redux'


export function createBook(
    state = {
        requestStatus: "NONE",
        inFlight: false,
        showModal: false
    },
    action
) {
    switch (action.type) {
        case "REQUEST_NEW_BOOK":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_NEW_BOOK_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
                showModal: true
            });
        case "RESPONSE_NEW_BOOK_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
                showModal: true
            });
        case "RESET_BOOK_REQUEST":
            return Object.assign({}, state, {
                requestStatus: "NONE",
                inFlight: false,
                showModal: false
            });
        default:
            return state
    }
}


export default createBook;