import React from 'react';
import ReactDOM from 'react-dom';
import BookListViewer from './containers/bookList';
// import FoodCreator from './containers/foodCreator';
import BookSearch from './containers/bookSearch';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/bookSearch" component={BookSearch}/>
                <Route path="/" component={BookListViewer} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);