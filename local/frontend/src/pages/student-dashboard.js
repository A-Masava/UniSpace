// Student Dashboard Logic
import { authUtils } from '../utils/auth.js';
import { domUtils } from '../utils/dom.js';
import { apiService } from '../api/client.js';
import { socketManager } from '../sockets/manager.js';

// Check authentication on page load
authUtils.requireAuth();

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupNavigation();
    loadUserProfile();
});

function initDashboard() {
    // Initialize socket connection
    const token = authUtils.getToken();
    socketManager.connect(token);

    // Setup message listeners
    setupSocketListeners();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get the page to show
            const pageName = item.dataset.page;
            showPage(pageName);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const pageId = pageName + 'Page';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            classes: 'My Classes',
            messages: 'Messages',
            resources: 'Resources',
            profile: 'Settings'
        };
        document.getElementById('pageTitle').textContent = titles[pageName] || 'Dashboard';

        // Load page-specific data
        loadPageData(pageName);
    }
}

function loadPageData(pageName) {
    switch (pageName) {
        case 'classes':
            loadClasses();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'resources':
            loadResources();
            break;
        case 'profile':
            loadSettings();
            break;
    }
}

async function loadUserProfile() {
    try {
        const user = authUtils.getUser();
        if (user) {
            document.getElementById('userNameSidebar').textContent = user.fullname;
            document.getElementById('userEmailSidebar').textContent = user.email;
            document.getElementById('userNameHeader').textContent = user.fullname;
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

async function loadClasses() {
    try {
        const response = await apiService.getClassrooms();
        const container = document.getElementById('classesContainer');
        const noMessage = document.getElementById('noClassesMessage');

        if (response.classrooms && response.classrooms.length > 0) {
            container.innerHTML = response.classrooms.map(cls => `
                <div class="class-card">
                    <div class="class-card-header">
                        <h3>${cls.className}</h3>
                    </div>
                    <div class="class-card-body">
                        <div class="class-info-item">
                            <span class="class-info-label">Code:</span>
                            <span class="class-info-value">${cls.classCode}</span>
                        </div>
                        <div class="class-info-item">
                            <span class="class-info-label">Teacher:</span>
                            <span class="class-info-value">${cls.teacherName}</span>
                        </div>
                        <div class="class-info-item">
                            <span class="class-info-label">Semester:</span>
                            <span class="class-info-value">${cls.semester}</span>
                        </div>
                    </div>
                    <div class="class-card-footer">
                        <button class="btn btn-primary" onclick="openClass('${cls._id}')">View</button>
                        <button class="btn btn-secondary" onclick="openChat('${cls._id}')">Chat</button>
                    </div>
                </div>
            `).join('');
            noMessage.style.display = 'none';
        } else {
            container.innerHTML = '';
            noMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading classes:', error);
    }
}

async function loadMessages() {
    // Load conversations for this student
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '<p>Load conversations here</p>';
}

async function loadResources() {
    // Load resources from all enrolled classes
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '<p>Load resources here</p>';
}

function loadSettings() {
    const user = authUtils.getUser();
    if (user) {
        document.getElementById('settingsName').value = user.fullname;
        document.getElementById('settingsEmail').value = user.email;
    }
}

function setupSocketListeners() {
    socketManager.on('message', (data) => {
        console.log('New message:', data);
        // Update UI with new message
    });

    socketManager.on('notification', (data) => {
        console.log('Notification:', data);
        // Show notification
    });
}

// Modal Functions
window.showJoinClassModal = function() {
    document.getElementById('joinClassModal').style.display = 'flex';
};

window.closeJoinClassModal = function() {
    document.getElementById('joinClassModal').style.display = 'none';
};

// Join Class Form
document.getElementById('joinClassForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const classCode = document.getElementById('classCode').value;
    const studentId = document.getElementById('studentId').value;

    try {
        const response = await apiService.joinClass(classCode, studentId);
        if (response.error) {
            alert('Error: ' + response.error);
        } else {
            alert('Joined class successfully!');
            closeJoinClassModal();
            loadClasses();
        }
    } catch (error) {
        console.error('Error joining class:', error);
    }
});

// Logout Function
window.logout = async function() {
    try {
        await apiService.logout();
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        authUtils.clearAuthData();
        socketManager.disconnect();
        window.location.href = '/pages/login.html';
    }
};
