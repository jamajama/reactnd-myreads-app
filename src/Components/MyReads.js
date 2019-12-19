import React, { Component } from "react";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "../BooksAPI";
import { Route, Switch } from "react-router-dom";

class MyReads extends Component {
  state = {
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  sendUpdatesToAPI = book => {
    BooksAPI.update(book, book.shelf).then(() => {
      this.setState(prevState => ({
        books: [
          ...prevState.books.filter(result => result.id !== book.id),
          book
        ]
      }));
    });
  };

  toggleSearch = flag => {
    this.setState(() => ({
      showSearchPage: flag
    }));
  };

  render() {
    const books = this.state.books;

    return (
      <Switch>
        {this.state.showSearchPage ? (
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBooks
                onToggleSearchPage={this.toggleSearch}
                oncallAPI={this.sendUpdatesToAPI}
                books={books}
              />
            )}
          />
        ) : (
          <Route
            path="/"
            render={() => (
              <BookShelf
                onToggleSearchPage={this.toggleSearch}
                oncallAPI={this.sendUpdatesToAPI}
                books={books}
              />
            )}
          />
        )}
      </Switch>
    );
  }
}

export default MyReads;
