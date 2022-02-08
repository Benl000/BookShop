'use strict';

function onInit() {
    renderBooks();

}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = `<thead><tr><th class="thSort" onclick="onSortBy('ID')"><button>ID</button></th>
    <th class="thSort" onclick="onSortBy('TITLE')"><button>Title</button></th>
    <th class="thSort" onclick="onSortBy('PRICE')"><button>Price</button></th>
    <th class="thSort" onclick="onSortBy('RATING')"><button>Rating</button></th>
    <th>Actions</th></tr></thead><tbody>`;
    strHTML += books.map((book) => {
        return `<tr><td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}$</td>
        <td>${countStars(book.rate)}</td>
        <td>
        <button class="readBookButton" onclick="onReadBook('${book.id}')">Read</button>
        <button class="updateBookButton" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="deleteBookButton" onclick="onDeleteBook('${book.id}')">Delete</button>
        </td>`;
    }).join('');
    strHTML += `</tbody>`;
    var elBooksTable = document.querySelector('.bookscontainer');
    elBooksTable.innerHTML = strHTML;
    onPageCount();
    var currPage = getCurrPage()
    var elPagesCounter = document.querySelector('.currPage');
    elPagesCounter.innerText=`PAGE:${currPage}`
}

function onAddBook() {
    const elBookTitle = document.querySelector('input[name=bookTitle]');
    const elBookPrice = document.querySelector('input[name=bookPrice]');
    const title = elBookTitle.value;
    const price = elBookPrice.value;
    if (!title || !price) return;
    addBook(title, price);
    elBookTitle.value = '';
    elBookPrice.value = '';
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('h4 span').innerText = book.author;
    elModal.querySelector('.pic').innerHTML = `<img src="img/${book.title}.jpg" alt="${book.title} cover">`;
    onGetRating(bookId);
    elModal.querySelector('p').innerText = book.synopsis;
    elModal.classList.add('open');
}

function onUpdateBook(bookId) {
    var newPrice = prompt('Enter new price in dollars');
    if (newPrice < 0) return;
    if (newPrice) {
        updateBook(bookId, newPrice);
        renderBooks();
    }
}

function onDeleteBook(bookId) {
    console.log(bookId);
    deleteBook(bookId);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onGetRating(bookId) {
    var book = getBookById(bookId);
    console.log(book);
    var elModal = document.querySelector('.modal');
    var strHTML = `<button onclick="minusRate('${bookId}')">-</button>
    <a class="rating">${countStars(book.rate)}</a>
    <button onclick="plusRate('${bookId}')">+</button>`;
    elModal.querySelector('section').innerHTML = strHTML;

}

function onSortBy(filter) {
    console.log('filter', filter);
    setSort(filter);
    renderBooks();
}

function onSetPage(page) {
    setPage(page);
    renderBooks();
}

function onPageCount() {
    var pages = pageCount();
    console.log(pages);
    var strHTML = ``;
    for (var i = 0; i < pages; i++) {
        strHTML += `<button onclick="onSetPage('${i}')">${i + 1}</button>`;
    }
    var elPages = document.querySelector('.pages');
    elPages.innerHTML = strHTML;
}