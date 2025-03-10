let editingNote = null; // Track currently edited note

function getRandomColor() {
    const colors = ["#D8BFD8", "#D8BFD8", "#D8BFD8",  "#D8BFD8"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getCurrentTime() {
    return new Date().toLocaleString();
}

// ✅ Add Checklist Item
function addChecklistItem() {
    const itemText = document.getElementById("checklistItem").value.trim();
    if (itemText === "") return;

    const checklist = document.getElementById("checklist");
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <input type="checkbox" onclick="toggleChecklistItem(this)">
        <span>${itemText}</span>
    `;
    checklist.appendChild(listItem);
    document.getElementById("checklistItem").value = "";
}

// ✅ Toggle Checklist Item (Strike-through)
function toggleChecklistItem(checkbox) {
    checkbox.parentElement.classList.toggle("completed");
}

// ✅ Save & Load Notes
function addOrUpdateNote() {
    let title = document.getElementById("noteTitle").value.trim();
    let content = document.getElementById("noteContent").value.trim();
    
    if (title === "" || content === "") return;

    const checklistItems = [];
    document.querySelectorAll("#checklist li").forEach(item => {
        checklistItems.push({
            text: item.querySelector("span").textContent,
            completed: item.querySelector("input").checked
        });
    });

    if (editingNote) {
        editingNote.querySelector(".note-text").innerHTML = `<strong>${title}:</strong> ${content}`;
        editingNote.querySelector(".checklist").innerHTML = checklistItems.map(item => `
            <li class="${item.completed ? 'completed' : ''}">
                <input type="checkbox" ${item.completed ? "checked" : ""} onclick="toggleChecklistItem(this)">
                <span>${item.text}</span>
            </li>`).join("");

        // ✅ Edited timestamp update karo
        editingNote.querySelector(".edited-time").textContent = `Edited: ${getCurrentTime()}`;
        
        editingNote = null;
    } else {
        const noteList = document.getElementById("noteList");
        let note = document.createElement("div");
        note.classList.add("note");
        note.style.backgroundColor = getRandomColor();

        note.innerHTML = `
            <div class="note-text"><strong>${title}:</strong> ${content}</div>
            <p class="timestamp created-time">Created: ${getCurrentTime()}</p>
            <p class="timestamp edited-time"></p> <!-- Edited time initially blank -->
            <ul class="checklist">
                ${checklistItems.map(item => `
                    <li class="${item.completed ? 'completed' : ''}">
                        <input type="checkbox" ${item.completed ? "checked" : ""} onclick="toggleChecklistItem(this)">
                        <span>${item.text}</span>
                    </li>`).join("")}
            </ul>
            <button class="edit-btn" onclick="editNote(this)">Edit</button>
            <button class="delete-btn" onclick="deleteNote(this)">Delete</button>
        `;

        noteList.appendChild(note);
    }

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    document.getElementById("checklist").innerHTML = "";
}

// ✅ Edit Note (Checklist nahi hategi, Edited time update hoga)
function editNote(btn) {
    editingNote = btn.closest(".note");
    document.getElementById("noteTitle").value = editingNote.querySelector(".note-text strong").textContent;
    document.getElementById("noteContent").value = editingNote.querySelector(".note-text").innerHTML.split("</strong>")[1].trim();
    
    // ✅ Checklist ko preserve karne ke liye
    document.getElementById("checklist").innerHTML = editingNote.querySelector(".checklist").innerHTML;
}

// ✅ Delete Note
function deleteNote(btn) {
    btn.closest(".note").remove();
}

// ✅ Delete All Notes
function clearNotes() {
    document.getElementById("noteList").innerHTML = "";
}

// ✅ Quotes System
const quotes = ["Believe in yourself!", "Dream big, work hard!", "Success comes with persistence!"];
function changeQuote() {
    document.getElementById("scrollingQuote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
}
setInterval(changeQuote, 5000);
changeQuote();
