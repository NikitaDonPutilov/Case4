let currentUser;

// Модель данных для книг
let books = JSON.parse(localStorage.getItem('books')) || [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2020, price: 20.5, available: true },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2018, price: 15.75, available: true },
    { id: 3, title: 'Book 3', author: 'Author 3', year: 2015, price: 30, available: false }
];

// Инициализация страницы
function initialize() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAdmin) {
        displayAdminInterface(); // Отображаем административную панель для администратора
    } else {
        displayUserInterface(); // Отображаем пользовательский интерфейс для обычных пользователей
        displayBooks(); // Отображаем книги для всех пользователей
    }
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
            ${currentUser && currentUser.isAdmin ? `
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            ` : ''}
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

// Добавление новой книги (для администратора)
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

// Функция для регистрации пользователя
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, email, password, isAdmin: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    window.location.href = 'login.html';
}

// Функция для авторизации пользователя
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify({ username: foundUser.username, isAdmin: foundUser.isAdmin }));
        alert('Login successful');
        window.location.href = 'index.html'; // Перенаправляем на главную страницу
    } else {
        alert('Invalid username or password');
    }
}
