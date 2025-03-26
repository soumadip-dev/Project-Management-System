////////// Dom elements
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const booksContainer = document.getElementById('books-container');
const searchBox = document.getElementById('search-box');

////////// Functions

// function to fetch books from API
async function fetchBooks() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/public/books');
    const data = await response.json();

    const books = data?.data?.data || [];

    return books;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to display book in webpage
async function displayBooks(books) {
  books.forEach(book => {
    const bookCard = createCard(book);
    booksContainer.appendChild(bookCard);
  });
}

// Function to create card of book
function createCard(book) {
  const card = document.createElement('a');
  card.classList.add('book-card');
  card.href = book.volumeInfo.infoLink;
  card.target = '_blank';

  card.innerHTML = `
   <div class="img-container">
          <img
            src="${
              book.volumeInfo.imageLinks?.thumbnail || 'fallback-image.jpg'
            }"
            alt="${book.volumeInfo.title}">
        </div>
        <div class="text-container">
          <h3>${book.volumeInfo.title}</h3>
          <p><strong>Author:</strong> ${
            book.volumeInfo.authors?.join(', ') || 'Unknown'
          }</p>
          <p><strong>Publisher:</strong> ${
            book.volumeInfo.publisher || 'Unknown'
          }</p>
          <p><strong>Published:</strong> ${
            book.volumeInfo.publishedDate || 'Unknown'
          }</p>
        </div>
  `;
  return card;
}

// Function to toggle theme ogf the webpage
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Function of searching
function filterByName(event) {
  const searchTerm = event.target.value.toLowerCase();
  const books = document.querySelectorAll('.text-container h3');

  books.forEach(function (book) {
    book.parentElement.parentElement.style.display = '';

    const bookTitle = book?.innerHTML.toLowerCase() || '';

    if (!bookTitle.startsWith(searchTerm)) {
      book.parentElement.parentElement.style.display = 'none';
    }
  });
}

// function to sort A-Z
async function sortingAToZ() {
  const books = await fetchBooks();
  books.sort((a, b) => {
    let titleA = a.volumeInfo.title.toLowerCase();
    let titleB = b.volumeInfo.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });
  displayBooks(books);
}

// function to sort Z-A
async function sortingZToA() {
  const books = await fetchBooks();
  books.sort((a, b) => {
    let titleA = a.volumeInfo.title.toLowerCase();
    let titleB = b.volumeInfo.title.toLowerCase();
    return titleB.localeCompare(titleA);
  });
  displayBooks(books);
}

// function to sort Date(oldest)
async function sortingDateOldest() {
  const books = await fetchBooks();
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateA.getTime() - dateB.getTime();
  });
  displayBooks(books);
}

// Function to sort Date(newest)
async function sortingDateNewest() {
  const books = await fetchBooks();
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  displayBooks(books);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Sort dropdown functionality
function selectSort(element) {
  const selectedText = element.textContent;
  document.getElementById('selectedSort').textContent = selectedText;
  booksContainer.innerHTML = '';
  switch (selectedText) {
    case 'Title (A-Z)':
      sortingAToZ();
      break;
    case 'Title (Z-A)':
      sortingZToA();
      break;
    case 'Date (Oldest)':
      sortingDateOldest();
      break;
    case 'Date (Newest)':
      sortingDateNewest();
      break;
    default:
      displayBooks(fetchBooks());
  }
}

//////////// Event listuners
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the books
  fetchBooks().then(books => displayBooks(books));

  // change theme
  themeToggle.addEventListener('click', toggleTheme);

  // Search
  searchBox.addEventListener('input', filterByName);

  // View controls
  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    booksContainer.classList.remove('list-view');
    booksContainer.classList.add('grid-view');
  });

  listView.addEventListener('click', function () {
    listView.classList.add('active');
    gridView.classList.remove('active');
    booksContainer.classList.remove('grid-view');
    booksContainer.classList.add('list-view');
  });
});
