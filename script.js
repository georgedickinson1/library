const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
};

function displayBook(book) {
    let div = document.createElement("div");
    div.innerHTML = book.title;
    document.getElementsByClassName("books")[0].appendChild(div);

}

function addBookToLibrary() {
    let title = prompt("Title: ");
    let author = prompt("Author: ");
    let pages = prompt("Pages: ");
    let read = prompt("Have you read?: ");

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(book);
    return;
};



console.log(myLibrary);