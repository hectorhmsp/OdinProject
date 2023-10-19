const submitButton = document.querySelector('.submit-button');
const bookContainer = document.querySelector('.book-container');
const addBookForm = document.getElementById('addBookForm');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const statusValue = document.getElementById('status').value;

  const newBook = new Book(titleValue, authorValue, pagesValue, statusValue);
  myLibrary.push(newBook);

  displayLibrary();
  
  addBookForm.reset();
}

function removeBook(index) {
  myLibrary.splice(index, 1); 
  displayLibrary();
}

function displayLibrary() {
  bookContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read}</p>
      <button onclick="removeBook(${index})">Remove</button>
    `;
    bookContainer.appendChild(bookDiv);
  });
}

submitButton.addEventListener('click', addBookToLibrary);