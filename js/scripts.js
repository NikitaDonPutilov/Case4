// Модель данных для книг
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2020, price: 20.5, available: true },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2018, price: 15.75, available: true },
    { id: 3, title: 'Book 3', author: 'Author 3', year: 2015, price: 30, available: false }
];

// Функция отображения всех книг
function displayBooks() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            ${book.available ? '<p>Status: Available</p>' : '<p>Status: Not available</p>'}
            <button onclick="viewBook(${book.id})">View Details</button>
        `;
        booksDiv.appendChild(bookDiv);
    });
}

// Функция просмотра деталей книги
function viewBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        window.location.href = 'book_details.html';
    } else {
        alert('Book not found');
    }
}

// Функция отображения деталей выбранной книги
function displayBookDetails() {
    const bookDetailsDiv = document.getElementById('bookDetails');
    const currentBook = JSON.parse(localStorage.getItem('currentBook'));

    if (currentBook) {
        bookDetailsDiv.innerHTML = `
            <h2>${currentBook.title}</h2>
            <p><strong>Author:</strong> ${currentBook.author}</p>
            <p><strong>Year:</strong> ${currentBook.year}</p>
            <p><strong>Price:</strong> $${currentBook.price}</p>
            ${currentBook.available ? '<p>Status: Available</p>' : '<p>Status: Not available</p>'}
        `;
    } else {
        bookDetailsDiv.innerHTML = '<p>Book details not available</p>';
    }
}

// Функция добавления новой книги
function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const price = parseFloat(document.getElementById('price').value);

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        year: year,
        price: price,
        available: true
    };

    books.push(newBook);
    alert('Book added successfully');
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = 'admin.html';
}
