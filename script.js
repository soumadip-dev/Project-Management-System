////////// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const booksContainer = document.getElementById('books-container');
const searchBox = document.getElementById('search-box');
const nextPage = document.getElementById('next');
const previousPage = document.getElementById('prev');

////////// Global variables
let page = 1;

////////// Functions

// Function to fetch books from API
async function fetchBooks(pageNumber) {
  try {
    const postsPerPage = 10;
    const url = `https://api.freeapi.app/api/v1/public/books?page=${pageNumber}`;

    const response = await fetch(url);
    const data = await response.json();

    const books = data?.data?.data || [];

    return books;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to display books on the webpage
async function displayBooks(books) {
  booksContainer.innerHTML = '';

  books.forEach(book => {
    const bookCard = createCard(book);
    booksContainer.appendChild(bookCard);
  });
  // Update pagination buttons and current page display
  document.getElementById('currentPage').textContent = page;
  previousPage.disabled = page === 1;
  nextPage.disabled = books.length < 10;
}

// Function to create a book card element
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

// Function to toggle the theme of the webpage
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Function to filter books by name
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

// Function to go to next page
async function goToNextPage() {
  const nextPageNumber = page + 1;
  const books = await fetchBooks(nextPageNumber);

  if (books.length === 0) {
    return;
  }

  page = nextPageNumber;
  await displayBooks(books);
  booksContainer.scrollIntoView({ behavior: 'smooth' });
}

// Function to go to previous page
async function goToPrevPage() {
  if (page > 1) {
    const prevPageNumber = page - 1;
    const books = await fetchBooks(prevPageNumber);

    if (books.length > 0) {
      page = prevPageNumber;
      await displayBooks(books);
    }
    booksContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to sort books by title in ascending order (A-Z)
async function sortingAToZ() {
  const books = await fetchBooks(page);
  books.sort((a, b) => {
    let titleA = a.volumeInfo.title.toLowerCase();
    let titleB = b.volumeInfo.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });
  displayBooks(books);
}

// Function to sort books by title in descending order (Z-A)
async function sortingZToA() {
  const books = await fetchBooks(page);
  books.sort((a, b) => {
    let titleA = a.volumeInfo.title.toLowerCase();
    let titleB = b.volumeInfo.title.toLowerCase();
    return titleB.localeCompare(titleA);
  });
  displayBooks(books);
}

// Function to sort books by published date (oldest first)
async function sortingDateOldest() {
  const books = await fetchBooks(page);
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateA.getTime() - dateB.getTime();
  });
  displayBooks(books);
}

// Function to sort books by published date (newest first)
async function sortingDateNewest() {
  const books = await fetchBooks(page);
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  displayBooks(books);
}

// Function to handle sort selection from dropdown
function selectSort(element) {
  const selectedText = element.textContent;
  document.getElementById('selectedSort').textContent = selectedText;

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
      displayBooks(fetchBooks(page));
  }
}

// Check for saved theme preference and apply it
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

//////////// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display books when the page loads
  fetchBooks(page).then(books => displayBooks(books));

  // Toggle theme when the button is clicked
  themeToggle.addEventListener('click', toggleTheme);

  // Filter books based on search input
  searchBox.addEventListener('input', filterByName);

  // Switch to grid view
  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    booksContainer.classList.remove('list-view');
    booksContainer.classList.add('grid-view');
  });

  // Switch to list view
  listView.addEventListener('click', function () {
    listView.classList.add('active');
    gridView.classList.remove('active');
    booksContainer.classList.remove('grid-view');
    booksContainer.classList.add('list-view');
  });

  // Go to next page
  nextPage.addEventListener('click', goToNextPage);
  // Go to Previous page
  previousPage.addEventListener('click', goToPrevPage);
});
