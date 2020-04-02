import Axios from 'axios'

function requestNewBook() {
    return {
        type: "REQUEST_NEW_BOOK"
    }
}

function receiveNewBookSuccess(bookId) {
    return {
        type: "RESPONSE_NEW_BOOK_SUCCESS",
        bookId
    }
}

function receiveNewBookError() {
    return {
        type: "RESPONSE_NEW_BOOK_ERROR"
    }
}

function resetBookRequestType() {
    return {
        type: "RESET_BOOK_REQUEST"
    }
}

export function resetBookRequest() {
    return function (dispatch) {
        dispatch(resetBookRequestType());
    }
}

export function postHaveRead(newBook) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.post(`/api/book/haveReadList`, newBook)
            .then(
                response => dispatch(receiveNewBookSuccess(response.data)),
                receiveNewBookError
            );
    }
}

export function postWantToRead(newBook) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.post(`/api/book/wantToReadList`, newBook)
            .then(
                response => dispatch(receiveNewBookSuccess(response.data)),
                receiveNewBookError
            );
    }
}