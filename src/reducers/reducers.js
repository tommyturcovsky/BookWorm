// Note that I'm putting ALL my reducers into a single
// file.  Typically, you want to to separate these out
// into smaller files.
import { combineReducers } from 'redux'
import createBook from "./createBookReducer";


function selectedFood(state = '', action) {
    switch (action.type) {
        case "SELECT_FOOD":
            return action.foodId
        default:
            return state
    }
}

function bookLists(
    state = {
        inFlight: false,
        haveReadList: [],
        wantToReadList: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_HAVE_READ_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_HAVE_READ_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                haveReadList: action.haveReadList,
            });
        case "REQUEST_WANT_TO_READ_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_WANT_TO_READ_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                wantToReadList: action.wantToReadList,
            });
        default:
            return state
    }
}

function switchViews(
    state = {
        searchView: false
    },
    action
) {
    switch (action.type) {
        case "SWITCH_TO_SEARCH":
            return Object.assign({}, state, {
                searchView: true
            })
        default:
            return state
    }

}


const rootReducer = combineReducers({
    selectedFood,
    createBook,
    views: switchViews,
    books: bookLists,
});

export default rootReducer