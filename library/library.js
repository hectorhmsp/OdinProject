// TAREFAS: 
//  > salvar os status dos livros, assim como os proprios livros, no navegador
//  > estilos (botões, p. ex.)
//  >

let result = '';

let books = JSON.parse(localStorage.getItem('books')) || {
        bksRead:0,
        bksNotRead:0,
        total:0
};

localStorage.setItem('books', JSON.stringify(books));

document.querySelector('.js-books-result').innerHTML = result;

function updateTotalBooks() {
  document.querySelector('.js-books-result')
    .innerHTML = `Books read: ${books.bksRead} &nbsp &nbsp  Books unread: ${books.bksNotRead} &nbsp &nbsp  Total books: ${books.total}`; 
}

const statusSelect = document.getElementById('status');
const jsForm = document.querySelector('.js-form');
const addBookForm = document.getElementById('addBookForm'); 
const jsBookCont = document.querySelector('.js-book-container')

const bookContainerDiv = document.createElement('div');
bookContainerDiv.className = 'book-container';

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

updateTotalBooks();

addBookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pagesValue = document.getElementById('pages').value;
    const statusValue = statusSelect.value;

    const selfBook = document.createElement('div');

    const newBookDiv = document.createElement('div');
    newBookDiv.className = 'book';

    const titleDiv = document.createElement('div');
    titleDiv.textContent = `Title: ${titleValue}`;
    titleDiv.className = 'form-inside';

    const authorDiv = document.createElement('div');
    authorDiv.textContent = `Author: ${authorValue}`;
    authorDiv.className = 'form-inside';

    const pagesDiv = document.createElement('div');
    pagesDiv.textContent = `Pages: ${pagesValue}`;
    pagesDiv.className = 'form-inside';

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = `Remove`;

    removeButton.addEventListener('click', function () {
        bookContainerDiv.removeChild(selfBook);
        books.total -= 1;

        if (!isReadButton.classList.contains('read')) {
            books.bksNotRead -= 1;        } else {
            isReadButton.textContent = 'Not read';
            books.bksRead -= 1;         
        }

        updateTotalBooks();

    });

    const isReadButton = document.createElement('button');
    isReadButton.className = 'is-read-button';

    if (statusValue === 'Read') {
        isReadButton.textContent = 'Read';
        isReadButton.classList.add('read');
        books.bksRead += 1;
        books.total += 1;
    } else {
        isReadButton.textContent = 'Not read';
        books.bksNotRead += 1;
        books.total += 1;
    }

    isReadButton.addEventListener('click', function () {
        if (!isReadButton.classList.contains('read')) {
            isReadButton.textContent = 'Read';
            isReadButton.classList.add('read');
            books.bksNotRead -= 1;
            books.bksRead += 1;
        } else {
            isReadButton.textContent = 'Not read';
            isReadButton.classList.remove('read');
            books.bksNotRead += 1;
            books.bksRead -= 1;            
        }
        updateTotalBooks();
    });

    newBookDiv.appendChild(titleDiv);
    newBookDiv.appendChild(authorDiv);
    newBookDiv.appendChild(pagesDiv);
    newBookDiv.appendChild(isReadButton);
    newBookDiv.appendChild(removeButton);

    jsBookCont.appendChild(bookContainerDiv);
    bookContainerDiv.appendChild(selfBook);
    selfBook.appendChild(newBookDiv);

    addBookForm.reset();

    updateTotalBooks();
});


