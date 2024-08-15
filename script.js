// Create Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// const myLibrary = [defaultBook, defaultBook2];
const myLibrary = [];

// Add event listener for remove button on newly created cards
function setEventListener(id, bookTitle, bookRead) {
    // Remove event listener
    let button = document.querySelector("#remove-button" + id);
    button.addEventListener("click", function() {
        removeBook(id, bookTitle);
    })
    // Read status event listener
    let read = document.querySelector("#icon" + id);
    read.addEventListener("click", function() {
        updateReadStatus(id, bookTitle);
    })
}

// Display Books
let count = 0;

{/* <span onclick="updateReadStatus('${count}', ${book.title})""> */}

function displayBook(book) {
    let div = document.createElement("div");
    count++;
    div.classList.add(`card${count}`)
    if (book.read === true) {
        div.innerHTML = `
        <button class="remove-button" id="remove-button${count}"><i class="fa-solid fa-xmark"></i></button>
            <p>"${book.title}"</p>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>Read: 
                <span>
                    <i class="fa-regular fa-circle-check" id="icon${count}"></i>
                </span>   
            <p>`;    
    } else {
        div.innerHTML = `
        <button class="remove-button" id="remove-button${count}"><i class="fa-solid fa-xmark"></i></button>
        <p>"${book.title}"</p>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p>Read: 
            <span>
                <i class="fa-regular fa-circle-xmark" id="icon${count}"></i>
            </span>    
        </p>`;   
    } 
    let bookTitle = book.title;
    let bookRead = book.read;
    document.getElementsByClassName("books")[0].appendChild(div);
    let description = document.getElementsByClassName("description")[0];
    if (description) {
        description.style.display = "none";
    };
    let lastLine = document.querySelector(".last-line");
        lastLine.style.marginTop = "0px";
    setEventListener(count, bookTitle, bookRead);
    scrollToBottom();
    let instruction = document.querySelector(".instruction");
    instruction.style.display = "block";

}

// User prompt to add book
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(book);
};


// Adds description once all books have been removed
function addDescription() {
    let cardContainer = document.querySelector(".books");
    if (cardContainer.innerHTML.trim() === "") {
        let description = document.getElementsByClassName("description")[0];
        description.style.display = "block";
        let lastLine = document.querySelector(".last-line");
        lastLine.style.marginTop = "80px";
        let instruction = document.querySelector(".instruction");
        instruction.style.display = "none";
    };
}

addDescription();

// Removes Book
function removeBook(count, bookTitle) {
    console.log(bookTitle)
    // Remove from display
    let removedBook = document.getElementsByClassName("card" + count)[0];
    removedBook.remove();

    //Remove from library
    const bookIndex = myLibrary.findIndex((book) => book.title === bookTitle);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }

    addDescription();
}

// Change status of read
function updateReadStatus(id, bookTitle) {
    // Change icon
    let read = document.querySelector("#icon" + id);
    if (read) {
        if (read.className === "fa-regular fa-circle-xmark") {
            read.className = "fa-regular fa-circle-check";
        } else {
            read.className = "fa-regular fa-circle-xmark";
        };
    };
    bookTitle = bookTitle.toString().trim();
    const book = myLibrary.find((book) => book.title === bookTitle);
    if (book.read === false) {
        book.read = true;
    } else {
        book.read = false;
    }
};

// Scroll to bottom of container when new card added
function scrollToBottom() {
    let container = document.querySelector(".books");
    setTimeout(() => {
        container.scrollTo(0, container.scrollHeight);
    }, 0);
}

// Modal functionality
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".add-book");
const closeModalBtn = document.querySelector(".modal-button-close");

openModalBtn.addEventListener("click" , () => {
    openModal(modal);
})

closeModalBtn.addEventListener("click", () => {
    closeModal(modal);
})

const openModal = function () {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  };

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
};

overlay.addEventListener("click", () => {
    closeModal(modal);
})

// Data collection
const form = document.querySelector("#form")
form.addEventListener("submit", () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    closeModal();
    form.reset();
    addBookToLibrary(title, author, pages, read)
})
