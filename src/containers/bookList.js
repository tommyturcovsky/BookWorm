import React from "react";
import {connect} from 'react-redux';
// import { fetchFoodList } from '../actions/foodActions';
import {
    clickedViewSwitch,
    fetchWantToReadList,
    fetchHaveReadList,
    deleteHaveReadBook,
    deleteWantToReadBook,
} from '../actions/bookActions';
import { postHaveRead } from "../actions/createBookActions";
import { postWantToRead } from "../actions/createBookActions";

import { Router, Route, Link, RouteHandler, Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/bookList.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Header from './components/header';

class BookListViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reload: 0
        };
    }
    // componentDidMount executes AFTER the constructor
    // but before the component renders for the first time
    // and it is only called once in the lifespan of the object
    // so API calls are often made here
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        // Some simple loading code.  If we were working with a button
        // or other logic, we might want to disable it
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        if (this.props.searchView) {
            return <Redirect to={'/bookSearch'} />
        }

        return (
        <div className="">
            <Header/>
            <div className="container mb-4  ">
                <div className="row py-2 mb-3 my-list-heading-container">
                    <h2 className="pl-2">My List</h2>
                    <Button onClick={() => this.props.switchView()} variant="warning"
                        className="mr-2">
                        + Add Books to List
                    </Button>   
                </div>
                <div className="row px-4 pb-2">
                    <Card className="col list-cards myList">
                        <Card.Body>    
                            <Card.Title className="border-bottom border-dark text-center">
                                <h3>Have Read</h3>
                            </Card.Title>
                            {this._renderHaveReadList(this.props.deleteHaveReadBook)}    
                        </Card.Body>
                    </Card>
                </div>
                <div className="row px-4 py-3">
                    <Card className="col list-cards myList">
                        <Card.Body>    
                            <Card.Title className="border-bottom border-dark text-center">
                                <h3>Want to Read</h3>
                            </Card.Title>
                            {this._renderWantToReadList(this.props.deleteWantToReadBook, this.props.switchToHaveReadBook)}
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {/* <div>{this._renderFoodList()}</div> */}  
        </div>
        );
    }

    _renderHaveReadList(deleteHaveReadBook) {
        if (this.props.haveReadList.length === 0) {
            return (<Card.Text>Add books to this list to see it populated</Card.Text>);
        }

        let bookRows = this.props.haveReadList.map(function (book, indx) {
            // console.log('index: ' + index)
            let request;
            return (
                <tr key={indx}>
                    <td><img src={book.thumbnail_link} alt={book.title} /></td>
                    <td className="my-auto">{book.title}</td>
                    <td>
                        <ul>
                            {book.author.map(auth => (
                                <li>{auth}</li>))}
                        </ul>
                    </td>
                    <td>
                        <div className="grouped-buttons">
                            <Button
                                className=""
                                variant="outline-danger"
                                onClick={() => deleteHaveReadBook(request = book.bookId)}>
                                Delete From List
                            </Button>
                        </div>
                    </td>
                </tr>);
        });

        return (
            <Table responsive>
                <thead >
                <tr>
                    <th>Book Cover</th>
                    <th>Title</th>
                    <th>Author(s)</th>
                    {/* <th>Description</th> May Make this later to have dropdown of entire description */}
                </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </Table>
        );
    }

    _renderWantToReadList(deleteWantToReadBook, switchLists) {
        if (this.props.wantToReadList.length === 0) {
            return (<Card.Text>Add books to this list to see it populated</Card.Text>);
        }

        let bookRows = this.props.wantToReadList.map(function (book, indx) {
            // console.log('index: ' + index)
            let request;
            let otherRequest;
            return (
                <tr key={indx}>
                    <td><img src={book.thumbnail_link} alt={book.title} /></td>
                    <td className="my-auto">{book.title}</td>
                    <td>
                        <ul>
                            {book.author.map(auth => (
                                <li>{auth}</li>))}
                        </ul>
                    </td>
                    <td>
                        <div className="grouped-buttons">
                            <Button
                                className=""
                                variant="outline-danger"
                                onClick={() => deleteWantToReadBook(request = book.bookId)}>
                                Delete From List
                            </Button>
                            <Button
                                className="mt-2"
                                variant="outline-secondary"
                                onClick={() => switchLists(otherRequest = book)}>
                                Mark as 'Have Read'
                            </Button>
                        </div>
                    </td>
                </tr>);
        });

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>Book Cover</th>
                    <th>Title</th>
                    <th>Author(s)</th>
                    {/* <th>Description</th> May Make this later to have dropdown of entire description */}
                </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </Table>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        onMount: () => {
            // thunk middleware simplifies a lot of the logic
            // but the idea is to treat thunk action creators
            // like normal action creators (thanks to the help
            // of the thunk middleware)
            dispatch(fetchHaveReadList());
            dispatch(fetchWantToReadList());
        },

        deleteHaveReadBook: (bookId) => {
            dispatch(deleteHaveReadBook(bookId))
        },

        deleteWantToReadBook: (bookId) => {
            dispatch(deleteWantToReadBook(bookId))
        },

        switchToHaveReadBook: (book) => {
            dispatch(postHaveRead(book));
            dispatch(deleteWantToReadBook(book.bookId));
            window.location.reload(true);
        },

        switchView: () => {
            dispatch(clickedViewSwitch())
        }
    }
};


// Accept the state and parse out whatever data we need
function mapStateToProps(state, props) {
    return {
        haveReadList: state.books.haveReadList,
        wantToReadList: state.books.wantToReadList,
        loading: state.books.inFlight,
        searchView: state.views.searchView
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookListViewer)