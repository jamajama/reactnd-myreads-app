import React, { Component, useState } from "react";

const ShelfChanger = props => {
  const [book, setBook] = useState(props.book);

  const handleChange = event => {
    book.shelf = event.target.value;
    setBook(book);
    props.onValueChange(book);
  };

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf} onChange={handleChange}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

const Book = props => {
  const { imageLinks } = props.book;

  const handleBookLocation = book => {
    props.onBookShelf(book);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail})`
          }}
        ></div>
        <ShelfChanger onValueChange={handleBookLocation} book={props.book} />
      </div>
    </div>
  );
};

class Books extends Component {
  handleBooks = book => {
    this.props.onUpdateShelf(book);
  };

  render() {
    const { header, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{header}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book onBookShelf={this.handleBooks} book={book} />
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(", ")}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Books;
