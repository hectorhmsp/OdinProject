const statusSelect = document.getElementById('status');
const jsForm = document.querySelector('.js-form');
const addBookForm = document.getElementById('addBookForm');
const jsBookCont = document.querySelector('.js-book-container');

let books = JSON.parse(localStorage.getItem('books')) || {
  bksRead: 0,
  bksNotRead: 0,
  total: 0,
};

function updateTotalBooks() {
  document.querySelector('.js-books-result').innerHTML = `Books read: ${books.bksRead} &nbsp &nbsp  Books unread: ${books.bksNotRead} &nbsp &nbsp  Total books: ${books.total}`;
}

function updateBookContainer() {
  const serializedBookContainers = jsBookCont.innerHTML;
  localStorage.setItem('bookContainers', serializedBookContainers);
}

function loadBookContainer() {
  const serializedBookContainers = localStorage.getItem('bookContainers');
  if (serializedBookContainers) {
    jsBookCont.innerHTML = serializedBookContainers;
  }
}

updateTotalBooks();
loadBookContainer();

addBookForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const statusValue = statusSelect.value;

  const selfBook = document.createElement('div');
  selfBook.className = 'self-book';

  const newBookDiv = document.createElement('div');
  newBookDiv.className = 'book';

  const titleDiv = document.createElement('div');
  titleDiv.textContent = `Title: ${titleValue}`;
  titleDiv.className = 'title';

  const authorDiv = document.createElement('div');
  authorDiv.textContent = `Author: ${authorValue}`;
  authorDiv.className = 'form-inside';

  const pagesDiv = document.createElement('div');
  pagesDiv.textContent = `Pages: ${pagesValue}`;
  pagesDiv.className = 'form-inside';

  const removeButton = document.createElement('button');
  removeButton.className = 'remove-button';
  removeButton.textContent = `Remove`;

  const isReadButton = document.createElement('button');
  isReadButton.className = 'is-read-button';

  if (statusValue === 'Read') {
    isReadButton.textContent = 'Read';
    isReadButton.classList.add('read');
    books.bksRead += 1;
    books.total += 1;
    isReadButton.style.backgroundColor = '#7aef7a';
  } else {
    isReadButton.textContent = 'Not read';
    books.bksNotRead += 1;
    books.total += 1;
    isReadButton.style.backgroundColor = '#ff7171';
  }

  isReadButton.addEventListener('click', function () {
    if (!isReadButton.classList.contains('read')) {
      isReadButton.textContent = 'Read';
      isReadButton.classList.add('read');
      books.bksNotRead -= 1;
      books.bksRead += 1;
      isReadButton.style.backgroundColor = '#7aef7a';
    } else {
      isReadButton.textContent = 'Not read';
      isReadButton.classList.remove('read');
      books.bksNotRead += 1;
      books.bksRead -= 1;
      isReadButton.style.backgroundColor = '#ff7171';
    }
    updateTotalBooks();
  });

  localStorage.setItem('books', JSON.stringify(books));
  updateTotalBooks();

  newBookDiv.appendChild(titleDiv);
  newBookDiv.appendChild(authorDiv);
  newBookDiv.appendChild(pagesDiv);
  newBookDiv.appendChild(isReadButton);
  newBookDiv.appendChild(removeButton);

  jsBookCont.appendChild(selfBook);
  selfBook.appendChild(newBookDiv);

  updateBookContainer();
  loadBookContainer();
  addBookForm.reset();
});

jsBookCont.addEventListener('click', function (event) {
  const target = event.target;

  if (target.classList.contains('remove-button')) {
    const selfBook = target.closest('.self-book');
    if (selfBook) {
      const bookContainerDiv = selfBook.closest('.js-book-container');
      bookContainerDiv.removeChild(selfBook);
      books.total -= 1;
      if (!selfBook.querySelector('.is-read-button').classList.contains('read')) {
        books.bksNotRead -= 1;
      } else {
        books.bksRead -= 1;
      }
      updateTotalBooks();
      localStorage.setItem('books', JSON.stringify(books));
      updateBookContainer();
    }
  } else if (target.classList.contains('is-read-button')) {
    if (!target.classList.contains('read')) {
      target.textContent = 'Read';
      target.classList.add('read');
      target.style.backgroundColor = '#7aef7a';
      books.bksNotRead -= 1;
      books.bksRead += 1;
    } else {
      target.textContent = 'Not read';
      target.classList.remove('read');
      target.style.backgroundColor = '#ff7171';
      books.bksNotRead += 1;
      books.bksRead -= 1;
    }
    updateTotalBooks();
    localStorage.setItem('books', JSON.stringify(books));
    updateBookContainer();
  }
});
