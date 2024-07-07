// Модель данных для книг
let books = JSON.parse(localStorage.getItem('books')) || [];

// Инициализация страницы
function initialize() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAdmin) {
        displayAdminInterface();
        displayBooks(); // Отображаем список книг
    } else {
        displayUserInterface();
    }
}

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
            <button onclick="editBook(${book.id})">Edit</button>
            <button onclick="deleteBook(${book.id})">Delete</button>
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

// Функция для удаления книги
function deleteBook(bookId) {
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        alert('Book deleted successfully');
    } else {
        alert('Book not found');
    }
}

// Функция для редактирования книги
function editBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        const newTitle = prompt('Enter new title (leave empty to keep current title):', book.title) || book.title;
        const newAuthor = prompt('Enter new author (leave empty to keep current author):', book.author) || book.author;
        const newYear = parseInt(prompt('Enter new year (leave empty to keep current year):', book.year)) || book.year;
        const newPrice = parseFloat(prompt('Enter new price (leave empty to keep current price):', book.price)) || book.price;
        const isAvailable = confirm('Is the book available?');

        const editedBook = {
            ...book,
            title: newTitle,
            author: newAuthor,
            year: newYear,
            price: newPrice,
            available: isAvailable
        };

        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            books.splice(index, 1, editedBook);
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
            alert('Book edited successfully');
        } else {
            alert('Book not found');
        }
    } else {
        alert('Book not found');
    }
}

// Функция для выхода пользователя из системы
function logoutUser() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
    window.location.href = 'login.html';
}

// Функция отображения интерфейса администратора
function displayAdminInterface() {
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('userPanel').style.display = 'none';
}

// Функция отображения интерфейса пользователя
function displayUserInterface() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('userPanel').style.display = 'block';
}
