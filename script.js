// Contact Class
class Contact {
    constructor(firstName, lastName, email, phone, address, about) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.about = about;
        this.id = Date.now().toString();
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// AddressBook Class
class AddressBook {
    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        this.saveContacts();
    }

    deleteContact(id) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.saveContacts();
    }

    getContacts() {
        return this.contacts;
    }

    saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
}

// UI Handler
class UI {
    constructor() {
        this.addressBook = new AddressBook();
        this.initializeApp();
    }

    initializeApp() {
        // Show loading animation
        this.showLoading();

        // Initialize event listeners after a short delay
        setTimeout(() => {
            this.hideLoading();
            this.bindEvents();
        }, 1500);
    }

    showLoading() {
        const loader = document.createElement('div');
        loader.className = 'loading-container';
        loader.innerHTML = '<div class="loading-text">Loading...</div>';
        document.body.appendChild(loader);
    }

    hideLoading() {
        const loader = document.querySelector('.loading-container');
        if (loader) {
            loader.remove();
        }
        document.querySelector('main').classList.add('page-transition');
    }

    bindEvents() {
        // Add Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddContact();
            });
        }

        // View Contacts
        const contactsList = document.getElementById('contactsList');
        if (contactsList) {
            this.displayContacts();
        }
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Show notification with animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto close after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    handleAddContact() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const about = document.getElementById('notes').value;

        const contact = new Contact(
            firstName,
            lastName,
            email,
            phone,
            address,
            about
        );

        this.addressBook.addContact(contact);
        this.showNotification('Contact added successfully!');
        setTimeout(() => {
            window.location.href = 'view.html';
        }, 2000);
    }

    displayContacts() {
        const contacts = this.addressBook.getContacts();
        const contactsList = document.getElementById('contactsList');
        
        if (contacts.length === 0) {
            contactsList.innerHTML = '<p>No contacts available. Add a new one!</p>';
            return;
        }

        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-card" data-id="${contact.id}">
                <div class="contact-info">
                    <h3>${contact.firstName} ${contact.lastName}</h3>
                    <p><i class="fas fa-envelope"></i> ${contact.email}</p>
                    <p><i class="fas fa-phone"></i> ${contact.phone}</p>
                </div>
                <div class="contact-actions">
                    <button class="view-button" onclick="ui.viewContact('${contact.id}')">View</button>
                    <button class="delete-button" onclick="ui.deleteContact('${contact.id}')">Delete</button>
                </div>
            </div>
        `).join('');

        // Modal close functionality
        const modal = document.getElementById('contactModal');
        const closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.onclick = () => {
                modal.style.display = "none";
            }
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    viewContact(id) {
        const contact = this.addressBook.contacts.find(c => c.id === id);
        if (!contact) return;

        const modal = document.getElementById('contactModal');
        const contactDetails = document.getElementById('contactDetails');
        
        contactDetails.innerHTML = `
            <div class="modal-contact-info">
                <h3>${contact.firstName} ${contact.lastName}</h3>
                <div class="detail-group">
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Phone:</strong> ${contact.phone}</p>
                </div>
                <div class="detail-group">
                    <p><strong>Address:</strong> ${contact.address || 'Not provided'}</p>
                </div>
                ${contact.about ? `
                <div class="detail-group">
                    <p><strong>About:</strong></p>
                    <p class="notes-text">${contact.about}</p>
                </div>
                ` : ''}
            </div>
        `;

        modal.style.display = "block";
    }

    deleteContact(id) {
        if (confirm('Are you sure you want to delete this contact?')) {
            this.addressBook.deleteContact(id);
            this.displayContacts();
            this.showNotification('Contact deleted successfully!', 'error');
        }
    }
}

// Initialize the UI
const ui = new UI(); 