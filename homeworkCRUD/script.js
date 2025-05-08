document.addEventListener('DOMContentLoaded', loadNotes);

function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (text === '') return;

    const noteDiv = createNoteElement(text);
    document.getElementById('notesContainer').appendChild(noteDiv);

    saveNotes();
    input.value = '';
}

function createNoteElement(text) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const noteText = document.createElement('span');
    noteText.className = 'note-text';
    noteText.textContent = text;

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newText = prompt('Edit note:', noteText.textContent);
        if (newText !== null) {
            noteText.textContent = newText.trim();
            saveNotes();
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        noteDiv.remove();
        saveNotes();
    };

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);
    noteDiv.appendChild(noteText);
    noteDiv.appendChild(buttonGroup);
    
    return noteDiv;
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-text').forEach(note => {
        notes.push(note.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(text => {
        const noteDiv = createNoteElement(text);
        document.getElementById('notesContainer').appendChild(noteDiv);
    });
}