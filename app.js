// DOM Elements
const mainNav = document.getElementById('mainNav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const loginBtn = document.getElementById('loginBtn');
const authModal = document.getElementById('authModal');
const closeModal = document.querySelector('.close');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const booksGrid = document.getElementById('booksGrid');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Sample Books Data
const books = [
    {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
        category: "Ficção",
        status: "Disponível"
    },
    {
        title: "O Alquimista",
        author: "Paulo Coelho",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        category: "Ficção",
        status: "Troca"
    },
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76",
        category: "Fantasia",
        status: "Disponível"
    }
];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Modal Functions
function openModal() {
    authModal.style.display = 'block';
}

function closeModalFn() {
    authModal.style.display = 'none';
}

// Event Listeners
loginBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFn);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        closeModalFn();
    }
});

// Auth Tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        authTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show/hide forms
        if (tab.dataset.tab === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        }
    });
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify({ email }));
        closeModalFn();
        updateUIForLoggedInUser();
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (name && email && password) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify({ name, email }));
        closeModalFn();
        updateUIForLoggedInUser();
    }
});

// Update UI based on login status
function updateUIForLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        loginBtn.textContent = 'Sair';
        loginBtn.removeEventListener('click', openModal);
        loginBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });
    }
}

// Render Books
function renderBooks() {
    booksGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="book-status ${book.status.toLowerCase()}">${book.status}</p>
                <button class="btn btn-primary request-book">Solicitar</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to request buttons
    document.querySelectorAll('.request-book').forEach(button => {
        button.addEventListener('click', handleBookRequest);
    });
}

// Handle book requests
function handleBookRequest(e) {
    const user = localStorage.getItem('user');
    if (!user) {
        alert('Você precisa estar logado para solicitar um livro');
        openModal();
        return;
    }
    
    alert('Solicitação enviada com sucesso!');
}

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inscrição realizada com sucesso!');
    newsletterForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    updateUIForLoggedInUser();
});