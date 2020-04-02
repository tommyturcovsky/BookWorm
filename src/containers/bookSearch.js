import React from "react";
import { connect } from 'react-redux';
import Axios from 'axios'
import { Redirect } from "react-router";

import { postHaveRead } from "../actions/createBookActions";
import { postWantToRead } from "../actions/createBookActions";
import { resetBookRequest } from "../actions/createBookActions";

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/bookSearch.css';

import Header from './components/header';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

class BookSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchResults: []
        };
}

    render() {

        const request = {}

        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row mb-2 py-2 pl-2 border-bottom border-dark my-list-heading-container">
                        <h2>Search for books to add to your list!</h2>
                        <a className="my-auto mr-3"href="/">
                            <Button variant="warning">
                                My List
                            </Button>
                        </a>
                    </div>
                    <div className="row my-list-heading-container myList">
                        <div className="container my-3 search-bar-container ">
                            
                            <div>
                                <label className="pr-2 search-label">Title</label>
                                <input onChange={(e) => request.title = e.target.value}
                                    name="title" component="input" type="text"
                                    placeholder="Enter title..."/>
                            </div>
                            
                            <div>
                                <label className="pr-2 search-label">Author</label>
                                <input onChange={(e) => request.author = e.target.value}
                                    name="author" component="input" type="text"
                                    placeholder="Enter Author..." />
                            </div>
                            <div className="">
                                <Button variant="success"
                                    onClick={() => this.searchForBooks(request)}
                                    className="search-button" type="submit">Search
                                    </Button>
                            </div>
                        </div>
                        <div className="container">
                            {this._renderSearchResults(this.props.addBookHaveRead, this.props.addBookWantToRead)}
                        </div>
                        
                    </div>
                    <div className="container mb-4 "></div>
                    {this.addToListAlert()}
                </div>
            </div>
        );
    };

    addToListAlert() {
        if (this.props.requestStatus === "SUCCESS") {
                  return (
                    <Modal show={this.props.showModal} onHide={this.props.resetBookRequest}>
                        <Modal.Header closeButton>
                        <Modal.Title>Succesfully add to List!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                        <Button variant="dark" onClick={this.props.resetBookRequest}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                  );
        } else if (this.props.requestStatus === "ERROR") {
            return (
                <Modal show={this.props.showModal} onHide={this.props.resetBookRequest}>
                    <Modal.Header closeButton>
                    <Modal.Title>Something went wrong! Try again</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="dark" onClick={this.props.resetBookRequest}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
              );
        }

        return null;
    }

    _renderSearchResults(postHaveRead, postWantToRead) {
        if (this.state.searchResults.length === 0) {
            return null;
        }

        const bookRows = this.state.searchResults.map(function (book, index) {
            // console.log('index: ' + index)
            let request;
            return (
                <tr key={index}>
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
                                variant="outline-secondary"
                                onClick={() => postHaveRead(request = book)}>
                                Add To "Have Read"
                            </Button>
                            <Button
                                className="mt-2"
                                variant="outline-secondary"
                                onClick={() => postWantToRead(request = book)}>
                                Add To "Want to Read"
                            </Button>
                        </div>
                    </td>
                </tr>);
        });

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>BookCover</th>
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

    //TODO: Disable Search Button until results are Displayed
    searchForBooks(request) {
        if (request.title === undefined && request.author === undefined) {
            return null;
        }
        let title = request.title;
        let author = request.author;
        let apiCall
        //break up spaces with + signs
        if (title && author) {
            title = title.replace(" ", "+");
            author = author.replace(" ", "+");
            apiCall = "https://www.googleapis.com/books/v1/volumes?q="+ title +"+inauthor:"+ author +"&key=AIzaSyDjTu9zKBrnpJomk99uXXd-0r-e48SWY_0";
        } else if (title) {
            title = title.replace(" ", "+");
            apiCall = "https://www.googleapis.com/books/v1/volumes?q="+ title +"&key=AIzaSyDjTu9zKBrnpJomk99uXXd-0r-e48SWY_0";
        } else if (author) {
            author = author.replace(" ", "+");
            apiCall = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"+ author +"&key=AIzaSyDjTu9zKBrnpJomk99uXXd-0r-e48SWY_0";
        }
        
        // console.log("title: " + title + "\nauthor: " + author);

        //Format words to this request
        // let apiCall = "https://www.googleapis.com/books/v1/volumes?q="+ title +"+inauthor:"+ author +"&key=AIzaSyDjTu9zKBrnpJomk99uXXd-0r-e48SWY_0";
        let bookResults = [];
        Axios.get(apiCall)
            .then(response => {
                // console.log(response.data.items);
                let i = 0;
                for (let book of response.data.items) {
                    let bookEntry = {};
                    //Get Necessary Information from each Title
                    bookEntry.index = i;
                    bookEntry.title = book.volumeInfo.title;
                    bookEntry.author = book.volumeInfo.authors;
                    bookEntry.description = book.volumeInfo.description;
                    bookEntry.thumbnail_link = book.volumeInfo.imageLinks.thumbnail
                    //Add to list
                    bookResults.push(bookEntry);
                    i++;
                }
                this.setState({
                    searchResults: bookResults
                });
                // console.log(bookResults.data.items[0].volumeInfo);
        });
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        addBookHaveRead: (request) => dispatch(postHaveRead(request)),

        addBookWantToRead: (request) => dispatch(postWantToRead(request)),

        resetBookRequest: () => dispatch(resetBookRequest())
    }
};

function mapStateToProps(state, props) {
    return {
        requestStatus: state.createBook.requestStatus,
        inFlight: state.createBook.inFlight,
        showModal: state.createBook.showModal
    }
};

export default BookSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch);