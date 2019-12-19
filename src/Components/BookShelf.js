import React, { Component } from "react";
import Books from './Books'
import { Link } from 'react-router-dom'

class BookShelf extends Component {
    
    filterByShelf = (shelf) => {
        return this.props.books.filter(book => 
             book.shelf === shelf
        )
    }

    handleStatus = (book)  => {
        this.props.oncallAPI(book)
    }

    showSearchPage = () => {
        this.props.onToggleSearchPage(true)
    }

    render() {
    
        const shelfs = [
            {
                name: 'Currently Reading',
                val: 'currentlyReading'
            },
            {
                name: 'Want To Read',
                val: 'wantToRead'
            },
            {
                name: 'Read',
                val: 'read'
            }            
        ]

        return (
            <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>  
              </div>  
            <div className="list-books-content">
                <div>
                {shelfs.map((shelf, index) => 
                    <Books key={index} onUpdateShelf={this.handleStatus} header={shelf.name} books={this.filterByShelf(shelf.val)}/>
                )}
                </div>
            </div>
            </div> 
                <Link to='/search'>
                    <div className="open-search">
                        <button onClick={this.showSearchPage}>Add a book</button>
                    </div>
                </Link>
            </div> 
        )
    }

}

export default BookShelf;