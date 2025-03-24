document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navbarContent = document.getElementById('navbarContent');

  menuToggle.addEventListener('click', function () {
    navbarContent.classList.toggle('active');
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  themeToggle.addEventListener('click', function () {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  // View controls
  const gridView = document.getElementById('gridView');
  const listView = document.getElementById('listView');

  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    // Add your grid view logic here
  });

  listView.addEventListener('click', function () {
    listView.classList.add('active');
    gridView.classList.remove('active');
    // Add your list view logic here
  });

  // Sort dropdown functionality
  function selectSort(element) {
    const selectedText = element.textContent;
    document.getElementById('selectedSort').textContent = selectedText;
    // Add your sort logic here
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navbarContent.contains(e.target) && e.target !== menuToggle) {
      navbarContent.classList.remove('active');
    }
  });
});
