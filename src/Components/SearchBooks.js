import React, { Component } from "react";
import Books from "./Books";
import { Link } from "react-router-dom";

export default class SearchBooks extends Component {
  state = {
    books: [],
    value: '',
    isValid: true
  };

  hideSearchPage = () => {
    this.props.onToggleSearchPage(false);
  };

  handleStatus = book => {
    this.props.oncallAPI(book);
  };

  searchBooks = event => {
    const query = event.target.value;
    const results = this.props.books.filter(
      book =>
        book.title.includes(query) || book.authors.join(" ").includes(query)
    );
    
    this.setState(() => ({
      books: query ? results : [],
      value: query,
      isValid: query ? (results.length === 0 ? false : true) : false
    }));
  };

  //findBooks = event => {
  //     const query = event.target.value;
  //     BooksAPI.search(query)
  //     .then((books) => {
  //         this.setState({
  //             books,
  //         })
  //     })
  // }

  render() {
    console.log(this.state.isValid)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.hideSearchPage}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        <Books books={this.state.books} onUpdateShelf={this.handleStatus} />
        {!this.state.isValid &&
           <h2>No results found</h2> 
        }
      </div>
    );
  }
}
