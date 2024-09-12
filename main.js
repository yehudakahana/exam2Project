let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
let sortAsc = true;

// יצירת חייל חדש
document.getElementById('soldier-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const soldier = {
        name: document.getElementById('name').value,
        rank: document.getElementById('rank').value,
        role: document.getElementById('role').value,
        company: document.getElementById('company').value,
        status: document.getElementById('status').value,
        missionDuration: document.getElementById('missionDuration').value,
    };

    soldiers.push(soldier);
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
    renderTable();
    this.reset();
});

// הצגת רשימת החיילים
function renderTable() {
    const tbody = document.getElementById('soldiers-body');
    tbody.innerHTML = ''; // איפוס התוכן

    soldiers.forEach((soldier, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${soldier.name}</td>
            <td>${soldier.rank}</td>
            <td>${soldier.role}</td>
            <td>${soldier.company}</td>
            <td>${soldier.status}</td>
            <td class="actions">
                <button onclick="editSoldier(${index})">edit</button>
                <button onclick="deleteSoldier(${index})">delete</button>
                ${soldier.status === 'Active' || soldier.status === 'Reserve' ? 
                    `<button onclick="startMission(${index})">start Mission</button>` : ''}
            </td>
        `;

        tbody.appendChild(row);
    });
}

// עריכת חייל
function editSoldier(index) {
    const soldier = soldiers[index];

    document.getElementById('edit-name').value = soldier.name;
    document.getElementById('edit-rank').value = soldier.rank;
    document.getElementById('edit-role').value = soldier.role;
    document.getElementById('edit-company').value = soldier.company;
    document.getElementById('edit-status').value = soldier.status;
    document.getElementById('edit-missionDuration').value = soldier.missionDuration;

    document.getElementById('create-soldier-section').style.display = 'none';
    document.getElementById('soldiers-list-section').style.display = 'none';
    document.getElementById('edit-soldier-section').style.display = 'block';

    document.getElementById('edit-soldier-section').dataset.index = index;
}

// שמירת שינויים
function saveSoldier() {
    const index = document.getElementById('edit-soldier-section').dataset.index;
    const updatedSoldier = {
        name: document.getElementById('edit-name').value,
        rank: document.getElementById('edit-rank').value,
        role: document.getElementById('edit-role').value,
        company: document.getElementById('edit-company').value,
        status: document.getElementById('edit-status').value,
        missionDuration: document.getElementById('edit-missionDuration').value
    };

    soldiers[index] = updatedSoldier;
    localStorage.setItem('soldiers', JSON.stringify(soldiers));

    document.getElementById('create-soldier-section').style.display = 'block';
    document.getElementById('soldiers-list-section').style.display = 'block';
    document.getElementById('edit-soldier-section').style.display = 'none';

    renderTable();
}

// ביטול עריכה
function cancelEdit() {
    document.getElementById('create-soldier-section').style.display = 'block';
    document.getElementById('soldiers-list-section').style.display = 'block';
    document.getElementById('edit-soldier-section').style.display = 'none';
}

// מחיקת חייל
function deleteSoldier(index) {
    soldiers.splice(index, 1);
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
    renderTable();
}

// הפעלת משימה
function startMission(index) {
    const button = document.querySelector(`#soldiers-body tr:nth-child(${index + 1}) .actions button:nth-child(3)`);
    button.innerText = 'מבוצע';
    button.disabled = true;

    let remainingTime = soldiers[index].missionDuration;
    button.innerText = `זמן משימה: ${remainingTime} שניות`;

    const interval = setInterval(() => {
        remainingTime--;
        button.innerText = `זמן משימה: ${remainingTime} שניות`;

        if (remainingTime <= 0) {
            clearInterval(interval);
            button.innerText = 'Mission Completed';
        }
    }, 1000);
}

// מיון חיילים
document.getElementById('sort-button').addEventListener('click', function () {
    soldiers.sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    sortAsc = !sortAsc;
    renderTable();
});

// הצגת רשימת החיילים בהעלאת העמוד
window.onload = function () {
    renderTable();
};

















// let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
// let sortAsc = true;

// // יצירת חייל חדש
// document.getElementById('soldier-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const soldier = {
//         name: document.getElementById('name').value,
//         rank: document.getElementById('rank').value,
//         role: document.getElementById('role').value,
//         company: document.getElementById('company').value,
//         status: document.getElementById('status').value,
//         missionDuration: document.getElementById('missionDuration').value,
//     };

//     soldiers.push(soldier);
//     localStorage.setItem('soldiers', JSON.stringify(soldiers));
//     renderTable();
//     this.reset();
// });

// // הצגת רשימת החיילים
// function renderTable() {
//     const tbody = document.getElementById('soldiers-body');
//     tbody.innerHTML = ''; 

//     soldiers.forEach((soldier, index) => {
//         const row = document.createElement('tr');

//         row.innerHTML = `
//             <td>${soldier.name}</td>
//             <td>${soldier.rank}</td>
//             <td>${soldier.role}</td>
//             <td>${soldier.company}</td>
//             <td>${soldier.status}</td>
//             <td>${soldier.missionDuration}</td>
//             <td class="actions">
//                 <button onclick="editSoldier(${index})">edit</button>
//                 <button onclick="deleteSoldier(${index})">delete</button>
//                 ${soldier.status === 'Active' || soldier.status === 'Reserve' ? 
//                     `<button onclick="startMission(${index})">start Mission</button>` : ''}
//             </td>
//         `;

//         tbody.appendChild(row);
//     });
// }





// // עריכת חייל
// function editSoldier(index) {
//     const soldier = soldiers[index];

//     document.getElementById('edit-name').value = soldier.name;
//     document.getElementById('edit-rank').value = soldier.rank;
//     document.getElementById('edit-role').value = soldier.role;
//     document.getElementById('edit-company').value = soldier.company;
//     document.getElementById('edit-status').value = soldier.status;
//     document.getElementById('edit-missionDuration').value = soldier.missionDuration;

//     document.getElementById('create-soldier-section').style.display = 'none';
//     document.getElementById('soldiers-list-section').style.display = 'none';
//     document.getElementById('edit-soldier-section').style.display = 'block';

//     document.getElementById('edit-soldier-section').dataset.index = index;
// }

// // שמירת שינויים
// function saveSoldier() {
//     const index = document.getElementById('edit-soldier-section').dataset.index;
//     const updatedSoldier = {
//         name: document.getElementById('edit-name').value,
//         rank: document.getElementById('edit-rank').value,
//         role: document.getElementById('edit-role').value,
//         company: document.getElementById('edit-company').value,
//         status: document.getElementById('edit-status').value,
//         missionDuration: document.getElementById('edit-missionDuration').value
//     };

//     soldiers[index] = updatedSoldier;
//     localStorage.setItem('soldiers', JSON.stringify(soldiers));

//     document.getElementById('create-soldier-section').style.display = 'block';
//     document.getElementById('soldiers-list-section').style.display = 'block';
//     document.getElementById('edit-soldier-section').style.display = 'none';

//     renderTable();
// }

// // ביטול עריכה
// function cancelEdit() {
//     document.getElementById('create-soldier-section').style.display = 'block';
//     document.getElementById('soldiers-list-section').style.display = 'block';
//     document.getElementById('edit-soldier-section').style.display = 'none';
// }


// // מחיקת חייל
// function deleteSoldier(index) {
//     soldiers.splice(index, 1);
//     localStorage.setItem('soldiers', JSON.stringify(soldiers));
//     renderTable();
// }

// // הפעלת משימה
// function startMission(index) {
//     const button = document.querySelector(`#soldiers-body tr:nth-child(${index + 1}) .actions button:nth-child(3)`);
//     button.innerText = 'מבוצע';
//     button.disabled = true;

//     let remainingTime = soldiers[index].missionDuration;
//     button.innerText = `זמן משימה: ${remainingTime} שניות`;

//     const interval = setInterval(() => {
//         remainingTime--;
//         button.innerText = `זמן משימה: ${remainingTime} שניות`;

//         if (remainingTime <= 0) {
//             clearInterval(interval);
//             button.innerText = 'Mission Completed';
//         }
//     }, 1000);
// }

// // מיון חיילים
// document.getElementById('sort-button').addEventListener('click', function () {
//     soldiers.sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
//     sortAsc = !sortAsc;
//     renderTable();
// });

// // הצגת רשימת החיילים בהעלאת העמוד
// window.onload = function () {
//     renderTable();
// };























