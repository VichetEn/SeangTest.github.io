// JavaScript for the Dashboard

// Sidebar navigation active state
const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// Select/Deselect all checkboxes in the table
const mainCheckbox = document.querySelector('.briefs-table thead input[type="checkbox"]');
const rowCheckboxes = document.querySelectorAll('.briefs-table tbody input[type="checkbox"]');

mainCheckbox.addEventListener('change', () => {
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = mainCheckbox.checked;
    });
});

rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (!checkbox.checked) {
            mainCheckbox.checked = false;
        }
        const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
        mainCheckbox.checked = allChecked;
    });
});

// Sorting functionality
const sortBySelect = document.querySelector('.filters .sort-by');
sortBySelect.addEventListener('change', () => {
    const option = sortBySelect.value;
    const rows = Array.from(document.querySelectorAll('.briefs-table tbody tr'));

    rows.sort((a, b) => {
        const cellA = a.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        const cellB = b.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();

        if (option.includes('Alphabetical')) {
            return option.includes('(A-Z)') ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
        // Further sorting logic for dates or statuses can be added here
        return 0;
    });

    const tbody = document.querySelector('.briefs-table tbody');
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
});

// Archive and Delete actions
const archiveButton = document.querySelector('.btn-archive');
const deleteButton = document.querySelector('.btn-delete');

archiveButton.addEventListener('click', () => {
     rowCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.closest('tr').classList.add('archived');
        }
    });
    alert('Selected briefs have been archived.');
});

deleteButton.addEventListener('click', () => { 
     rowCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.closest('tr').remove();
        }
    });
    alert('Selected briefs have been deleted.');
});





// Additional JavaScript for Enhanced Functionality

// Create New Button Functionality
const createButton = document.querySelector('.btn-create');
createButton.addEventListener('click', () => {
    const name = prompt('Enter the name of the name:');
    const gender = prompt('Enter the gender:');
    const folder = prompt('Enter the folder (e.g., Client - XYZ):');
    const assignee = prompt('Enter the assignee:');
    const status = prompt('Enter the status (e.g., To Do, In Progress, Approved):');
    const dueDate = prompt('Enter the due date (e.g., May 30):');

    if (name && gender && folder && assignee && status && dueDate) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${name}</td>
            <td>${gender}</td>
            <td>${folder}</td>
            <td><i class='bx bxs-user'></i> ${assignee}</td>
            <td class="status-${status.toLowerCase().replace(/\s/g, '')}">${status}</td>
            <td>${dueDate}</td>
            <td>
                <i class='bx bx-edit' style="cursor: pointer; margin-right: 10px;"></i>
                <i class='bx bx-trash' style="cursor: pointer;"></i>
            </td>
        `;

        const tbody = document.querySelector('.briefs-table tbody');
        tbody.appendChild(newRow);
        alert('New brief created successfully!');
    } else {
        alert('All fields are required. Please try again.');
    }
});

// Filter Functionality
const searchInput = document.querySelector('.filters input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.briefs-table tbody tr');

    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        if (name.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// View, Edit, and Delete Functionality (CRUD)
const tableBody = document.querySelector('.briefs-table tbody');
tableBody.addEventListener('click', (e) => {
    const target = e.target;
    const row = target.closest('tr');

    if (target.classList.contains('bx-edit')) {
        // Edit functionality
        const name = row.querySelector('td:nth-child(2)').textContent;
        const gender = row.querySelector('td:nth-child(3)').textContent;
        const folder = row.querySelector('td:nth-child(4)').textContent;
        const assignee = row.querySelector('td:nth-child(5)').textContent;
        const status = row.querySelector('td:nth-child(6)').textContent;
        const dueDate = row.querySelector('td:nth-child(7)').textContent;

        const newName = prompt('Edit Name:', name);
        const newGender = prompt('Edit Gender:', gender);
        const newFolder = prompt('Edit Folder:', folder);
        const newAssignee = prompt('Edit Assignee:', assignee);
        const newStatus = prompt('Edit Status:', status);
        const newDueDate = prompt('Edit Due Date:', dueDate);

        if (newName && newGender && newFolder && newAssignee && newStatus && newDueDate) {
            row.querySelector('td:nth-child(2)').textContent = newName;
            row.querySelector('td:nth-child(3)').textContent = newGender;
            row.querySelector('td:nth-child(4)').textContent = newFolder;
            row.querySelector('td:nth-child(5)').textContent = newAssignee;
            row.querySelector('td:nth-child(6)').textContent = newStatus;
            row.querySelector('td:nth-child(7)').textContent = newDueDate;
            alert('Brief updated successfully!');
        } else {
            alert('All fields are required. Please try again.');
        }
    } else if (target.classList.contains('bx-trash')) {
        // Delete functionality
        if (confirm('Are you sure you want to delete this brief?')) {
            row.remove();
            alert('Brief deleted successfully!');
        }
    }
});

// Add Edit and Delete Icons to Each Row
const addActionIcons = () => {
     const rows = document.querySelectorAll('.briefs-table tbody tr');
     rows.forEach(row => {
             const actionCell = document.createElement('td');
             actionCell.innerHTML = `
                 <i class='bx bx-edit' style="cursor: pointer; margin-right: 10px;"></i>
                 <i class='bx bx-trash' style="cursor: pointer;"></i>
             `;
             row.appendChild(actionCell);
     });
 };
 
 // Initialize Action Icons
 addActionIcons();