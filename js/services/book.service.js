'use strict';
const STORAGE_KEY = 'BooksDB';
const PAGE_SIZE = 8;
var gPageIdx = 0;
var gBooks;
var gSortFilter;

_createBooks();

function setPage(page) {
    if (page === 'PRE') {
        if (gPageIdx * PAGE_SIZE <= 0) return;
        gPageIdx--;
    } else if (page === 'NEXT') {
        if (gPageIdx * PAGE_SIZE > Math.ceil(gBooks.length / PAGE_SIZE) + 1) return;
        gPageIdx++;
    } else gPageIdx = +page;
}

function pageCount() {
    var pagesCount = Math.ceil(gBooks.length / PAGE_SIZE);
    console.log(pagesCount);
    return pagesCount;
}

function getCurrPage() {
    return (gPageIdx + 1);
}

function getBooks() {
    var books = gBooks;
    const startIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function addBook(title, price) {
    var newBook = _createBook(title, price);

    gBooks.unshift(newBook);
    _saveBooksToStorage();
}

function _createBook(title, price) {
    var book = {
        id: makeId(),
        title: title,
        price: price,
        rate: 3,
        synopsis: makeLorem(),
        author: makeAuthor()
    };
    return book;
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) books = _defultBooks()
    gBooks = books;
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id);
    gBooks[bookIdx].price = newPrice;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id);
    return book;
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

function countStars(num) {
    var stars = '';
    for (var i = 0; i < num; i++) {
        stars += '⭐';
    }
    return stars;
}

function plusRate(bookId) {
    var book = getBookById(bookId);
    console.log(book);
    if (book.rate === 5) return;
    book.rate++;
    _saveBooksToStorage();
    onGetRating(bookId);
    renderBooks();
}

function minusRate(bookId) {
    var book = getBookById(bookId);
    console.log(book);
    if (book.rate === 1) return;
    book.rate--;
    _saveBooksToStorage();
    onGetRating(bookId);
    renderBooks();
}

function setSort(filter) {
    gSortFilter = filter;
}

function getBooksForDisplay() {
    var books = getBooks();
    if (gSortFilter === 'ID') return books.sort((a, b) => a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1);
    else if (gSortFilter === 'TITLE') return books.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1);
    else if (gSortFilter === 'PRICE') return books.sort((a, b) => a.price - b.price);
    else if (gSortFilter === 'RATING') return books.sort((a, b) => a.rate - b.rate);
    else return getBooks();
}

function _defultBooks() {
    var books=[{
        id: makeId(),
        title: 'Alice in wonderland',
        price: '20',
        rate: 5,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'Bad books',
        price: '10',
        rate: 2,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'From blood and ash',
        price: '15',
        rate: 1,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'Harry Potter',
        price: '15',
        rate: 4,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'Ready player one',
        price: '25',
        rate: 4,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'The witches',
        price: '15',
        rate: 4,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'The alchemist',
        price: '20',
        rate: 3,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'The Da Vinci Code',
        price: '25',
        rate: 2,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'The little prince',
        price: '10',
        rate: 5,
        synopsis: makeLorem(),
        author: makeAuthor()
    },{
        id: makeId(),
        title: 'The shadow of the wind',
        price: '25',
        rate: 5,
        synopsis: makeLorem(),
        author: makeAuthor()
    }]
    return books
}