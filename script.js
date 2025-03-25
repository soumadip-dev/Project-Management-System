////////// Dom elements
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const booksContainer = document.getElementById('books-container');

////////// Functions

async function fetchBooks() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/public/books');
    const data = await response.json();

    const books = data?.data?.data || [];

    books.forEach(book => {
      const bookCard = createCard(book);
      booksContainer.appendChild(bookCard);
    });

    return data.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createCard(book) {
  const card = document.createElement('a');
  card.classList.add('book-card');
  card.href = book.volumeInfo.infoLink;
  card.target = '_blank';
  // card.setAttribute(
  //   'data-link',
  //   book.volumeInfo.infoLink ? encodeURI(book.volumeInfo.infoLink) : '#'
  // );

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

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

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

// Sort dropdown functionality
function selectSort(element) {
  const selectedText = element.textContent;
  document.getElementById('selectedSort').textContent = selectedText;
  // Add your sort logic here
}

//////////// Event listuners
document.addEventListener('DOMContentLoaded', fetchBooks);
