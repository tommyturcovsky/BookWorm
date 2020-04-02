import Axios from 'axios'

function requestHaveReadList() {
    return {
        type: "REQUEST_HAVE_READ_LIST"
    }
}

function receiveHaveReadList(haveReadList) {
    return {
        type: "RECEIVE_HAVE_READ_LIST",
        haveReadList
    }
}

function requestWantToReadList() {
    return {
        type: "REQUEST_WANT_TO_READ_LIST"
    }
}

function receiveWantToReadList(wantToReadList) {
    return {
        type: "RECEIVE_WANT_TO_READ_LIST",
        wantToReadList
    }
}

export function clickedViewSwitch() {
    return {
        type: "SWITCH_TO_SEARCH"
    }
}

export function selectFood(foodId) {
    return {
        type: "SELECT_FOOD",
        foodId
    }
}

export function fetchHaveReadList() {
    return function(dispatch) {
        // Before we do anything, we let the state know
        // that we're requesting the food list but that it hasn't loaded yet
        // This lets us do any load animation or disable important functionality
        dispatch(requestHaveReadList());
        // Axios is a just an easy way to make an API call
        // Remember how we set the proxy in package.json?
        // This prefills that so it communicates with the server
        return Axios.get(`/api/book/haveReadList`) // We used Axios last week!
            // Once Axios is done GETTING the request, we can pass the data to another
            // action creator and dispatch that
            .then(response => dispatch(receiveHaveReadList(response.data)),
                // A better option might be to emit an  action with type 'error' to let users
                // know that something went wrong.
                error => console.log('An error occurred.', error) // Note that errors should be handled in the
                // second argument, not via catch, when using
                // thunk
            );
    }
}

export function fetchWantToReadList() {
    return function(dispatch) {

        dispatch(requestWantToReadList());
        return Axios.get(`/api/book/wantToReadList`)
            .then(response => dispatch(receiveWantToReadList(response.data)),
                error => console.log('An error occurred.', error)

            );
    }
}

export function deleteHaveReadBook(bookId) {
    return function (dispatch) {
        
        dispatch(requestHaveReadList());
        return Axios.delete('/api/book/haveReadList/' + bookId)
            .then(response => dispatch(receiveHaveReadList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function deleteWantToReadBook(bookId) {
    return function (dispatch) {
        
        dispatch(requestWantToReadList());
        return Axios.delete('/api/book/wantToReadList/' + bookId)
            .then(response => dispatch(receiveWantToReadList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}