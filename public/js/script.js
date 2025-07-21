// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editTitle = document.getElementById('editTitle');
const editPriority = document.getElementById('editPriority');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showAlertIfNeeded();
});

function initializeEventListeners() {
    // Todo form submission
    if (todoForm) {
        todoForm.addEventListener('submit', function(e) {
            const inputValue = todoInput.value.trim();
            if (!inputValue) {
                e.preventDefault();
                showAlert('Please enter a task before clicking add!', 'error');
                todoInput.focus();
                return false;
            }
        });
    }

    // Edit button listeners
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const title = this.getAttribute('data-title');
            const priority = this.getAttribute('data-priority');
            openEditModal(id, title, priority);
        });
    });

    // Close modal when clicking outside
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }

    // Enter key in todo input
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                todoForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Clear completed todos
    const clearCompletedBtn = document.querySelector('[onclick="clearAllCompleted()"]');
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearAllCompleted();
        });
    }
}

function showAlertIfNeeded() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')) {
        const errorType = urlParams.get('error');
        let message = 'An error occurred. Please try again.';
        
        switch(errorType) {
            case 'empty':
                message = 'Please enter a task title before clicking add!';
                break;
            case 'creation_failed':
                message = 'Failed to create task. Please try again.';
                break;
            case 'update_failed':
                message = 'Failed to update task. Please try again.';
                break;
            case 'delete_failed':
                message = 'Failed to delete task. Please try again.';
                break;
            case 'no_completed':
                message = 'No completed tasks to clear!';
                break;
        }
        
        showAlert(message, 'error');
    }
    
    if (urlParams.get('success')) {
        const successType = urlParams.get('success');
        let message = 'Operation completed successfully!';
        
        switch(successType) {
            case 'created':
                message = 'Task created successfully!';
                break;
            case 'updated':
                message = 'Task updated successfully!';
                break;
            case 'deleted':
                message = 'Task deleted successfully!';
                break;
            case 'cleared':
                const count = urlParams.get('count') || '';
                message = `All completed tasks cleared successfully! ${count ? `(${count} tasks removed)` : ''}`;
                break;
        }
        
        showAlert(message, 'success');
    }
    
    // Clean up URL parameters
    if (urlParams.get('error') || urlParams.get('success')) {
        const url = new URL(window.location);
        url.searchParams.delete('error');
        url.searchParams.delete('success');
        url.searchParams.delete('count');
        window.history.replaceState({}, document.title, url);
    }
}

function openEditModal(id, title, priority) {
    if (!editModal || !editForm || !editTitle || !editPriority) {
        console.error('Modal elements not found');
        return;
    }

    editForm.action = `/tasks/${id}?_method=PUT`;
    editTitle.value = title;
    editPriority.value = priority;
    editModal.style.display = 'block';
    editTitle.focus();
    editTitle.select();
}

function closeEditModal() {
    if (editModal) {
        editModal.style.display = 'none';
    }
}

function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
        <button onclick="closeAlert()" class="close-alert">&times;</button>
    `;

    document.body.appendChild(alert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function closeAlert() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

function clearAllCompleted() {
    if (confirm('Are you sure you want to clear all completed tasks?')) {
        // Create a form and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/tasks/completed/all?_method=DELETE';
        
        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';
        form.appendChild(methodInput);
        
        document.body.appendChild(form);
        form.submit();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape' && editModal && editModal.style.display === 'block') {
        closeEditModal();
    }
    
    // Ctrl/Cmd + N to focus on new task input
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (todoInput) {
            todoInput.focus();
        }
    }
});

// Add some visual feedback for interactions
function addHoverEffects() {
    const todoItems = document.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Auto-save functionality for edit form
if (editForm) {
    editForm.addEventListener('submit', function(e) {
        const titleValue = editTitle.value.trim();
        if (!titleValue) {
            e.preventDefault();
            showAlert('Task title cannot be empty!', 'error');
            editTitle.focus();
            return false;
        }
    });
}

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced form validation
function validateTodoInput(input) {
    const value = input.trim();
    
    if (!value) {
        return { valid: false, message: 'Task title cannot be empty!' };
    }
    
    if (value.length > 200) {
        return { valid: false, message: 'Task title cannot exceed 200 characters!' };
    }
    
    if (value.length < 1) {
        return { valid: false, message: 'Task title must be at least 1 character long!' };
    }
    
    return { valid: true };
}

// Local storage for draft tasks
function saveDraft() {
    if (todoInput) {
        localStorage.setItem('todoDraft', todoInput.value);
    }
}

function loadDraft() {
    if (todoInput) {
        const draft = localStorage.getItem('todoDraft');
        if (draft) {
            todoInput.value = draft;
        }
    }
}

function clearDraft() {
    localStorage.removeItem('todoDraft');
}

// Initialize draft functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDraft();
    
    if (todoInput) {
        todoInput.addEventListener('input', saveDraft);
        
        todoForm.addEventListener('submit', function() {
            clearDraft();
        });
    }
});

// Add smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Statistics update animation
function animateStats() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            stat.style.animation = '';
        }, 500);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', animateStats);

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
