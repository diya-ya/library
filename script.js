const myLibrary = [];

function Book(title,author,pages,isRead) {
  this.id=crypto.randomUUID();
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.isRead=isRead;
}

function addBookToLibrary(title,author,pages,isRead) {
  const newBook=new Book(title,author,pages,isRead);
  myLibrary.push(newBook);
  createCard(newBook);
}

function createElement(tag, className, textContent = '') {
    const element = document.createElement(tag);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

const booksDiv = document.querySelector(".booksDiv");
function createCard(book){
    const card=document.createElement('div');
    card.className="bookCard";
    card.setAttribute('id',book.id);
    const bookTitle=createElement('h3', 'bookTitle', book.title);
    const bookAuthor=createElement('h4', 'bookAuthor', book.author);
    const bookPages=createElement('p', 'bookPages', `No. of Pages: ${book.pages}`);
    const isRead = createElement('p', 'isRead',book.isRead ? "✅ Already read" : "❌ Not yet read");
    const deleteBookBtn = createElement('button', 'deleteBook', 'Delete');
    deleteBookBtn.addEventListener('click', () => {
        deleteBook(book.id);
    });
    const changeStatusBtn = createElement('button', 'changeStatus', 'Change Status');
    changeStatusBtn.addEventListener('click', () => {
        changeStatus(book);
    });
    card.append(bookTitle,bookAuthor,bookPages,isRead,deleteBookBtn,changeStatusBtn);
    return card;
}
function changeStatus(book) {
    book.isRead ? book.isRead=false : book.isRead=true;
    displayAllBooks();
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id == id);
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
    displayAllBooks();
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);

const submitBook = document.getElementById('submitBook');
submitBook.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector('.addForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const title =document.getElementById('title').value.trim();
    const author =document.getElementById('author').value.trim();
    const pages=document.getElementById('pages').value.trim();
    const isRead = document.getElementById('isRead').checked;
    addBookToLibrary(title,author,pages,isRead);
    displayAllBooks();
    document.querySelector('.addDiv').close();
    document.querySelector('.addForm').reset();
});

const openDialog = document.querySelector('.add');
openDialog.addEventListener('click', () => {
    document.querySelector('.addDiv').showModal();
});


function displayAllBooks() {
    booksDiv.innerHTML = '';
    const bookCards = myLibrary.map(book=>createCard(book));
    booksDiv.append(...bookCards);
}

displayAllBooks();