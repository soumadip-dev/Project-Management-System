# Book Listing Application

A web application that displays books from a public API with various viewing and sorting options.

## Features

- View books in grid or list layout
- Dark/light theme toggle (persists between sessions)
- Search books by title
- Sort books by:
  - Title (A-Z or Z-A)
  - Publication date (newest or oldest first)
- Pagination support
- Responsive design

## How to Use

1. Open `index.html` in your browser
2. Use the controls to:
   - Toggle between dark/light theme (moon icon)
   - Switch between grid/list view
   - Search for specific books
   - Sort books using the dropdown
   - Navigate through pages using prev/next buttons
3. Click on any book card to open its details page

## Technical Details

- Uses the FreeAPI Books API
- Vanilla JavaScript (no frameworks)
- Responsive CSS
- LocalStorage for theme preference persistence

## API Reference

This application uses the [FreeAPI Books API](https://www.freeapi.app/api/v1/public/books)