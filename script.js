const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
};

let book1 = new Book("LV", "Catwalk", 347, "not-read");

console.log(book1.info());