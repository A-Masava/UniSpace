// Teacher Dashboard Logic
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
            students: 'Students',
            messages: 'Messages',
            approvals: 'Enrollment Approvals',
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
        case 'students':
            loadStudents();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'approvals':
            loadApprovals();
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
                            <span class="class-info-label">Semester:</span>
                            <span class="class-info-value">${cls.semester}</span>
                        </div>
                        <div class="class-students-count">
                            <strong>${cls.studentCount || 0}</strong> Students Enrolled
                        </div>
                    </div>
                    <div class="class-card-footer">
                        <button class="btn btn-primary" onclick="manageClass('${cls._id}')">Manage</button>
                        <button class="btn btn-secondary" onclick="archiveClass('${cls._id}')">Archive</button>
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

async function loadStudents() {
    // Load all students from all classes
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '<tr><td colspan="6">Loading students...</td></tr>';
}

async function loadMessages() {
    // Load conversations with students
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '<p>Load conversations here</p>';
}

async function loadApprovals() {
    try {
        // Load pending enrollment requests
        const container = document.getElementById('approvalsContainer');
        const noMessage = document.getElementById('noApprovalsMessage');

        container.innerHTML = '<p>Loading approvals...</p>';
        // Fetch and display approvals
    } catch (error) {
        console.error('Error loading approvals:', error);
    }
}

async function loadResources() {
    // Load resources uploaded by this teacher
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

    socketManager.on('enrollment-request', (data) => {
        console.log('New enrollment request:', data);
        // Update approvals count
    });
}

// Modal Functions
window.showCreateClassModal = function() {
    document.getElementById('createClassModal').style.display = 'flex';
};

window.closeCreateClassModal = function() {
    document.getElementById('createClassModal').style.display = 'none';
};

window.showUploadModal = function() {
    document.getElementById('uploadModal').style.display = 'flex';
};

window.closeUploadModal = function() {
    document.getElementById('uploadModal').style.display = 'none';
};

// Create Class Form
document.getElementById('createClassForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        className: document.getElementById('className').value,
        classCode: document.getElementById('classCode').value,
        semester: document.getElementById('semester').value,
        studentIdRange: {
            minId: parseInt(document.getElementById('minStudentId').value),
            maxId: parseInt(document.getElementById('maxStudentId').value)
        },
        description: document.getElementById('classDescription').value
    };

    try {
        const response = await apiService.createClassroom(data);
        if (response.error) {
            alert('Error: ' + response.error);
        } else {
            alert('Class created successfully!');
            closeCreateClassModal();
            loadClasses();
        }
    } catch (error) {
        console.error('Error creating class:', error);
    }
});

// Upload Resource Form
document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('resourceTitle').value);
    formData.append('classroomId', document.getElementById('resourceClass').value);
    formData.append('description', document.getElementById('resourceDescription').value);
    formData.append('file', document.getElementById('resourceFile').files[0]);

    try {
        const response = await apiService.uploadResource(formData);
        if (response.error) {
            alert('Error: ' + response.error);
        } else {
            alert('Resource uploaded successfully!');
            closeUploadModal();
            loadResources();
        }
    } catch (error) {
        console.error('Error uploading resource:', error);
    }
});

// Additional Functions
window.manageClass = function(classId) {
    alert('Manage class: ' + classId);
};

window.archiveClass = function(classId) {
    alert('Archive class: ' + classId);
};

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
