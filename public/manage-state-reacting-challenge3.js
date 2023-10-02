let viewMode = true
let firstName = 'Jane'
let lastName = 'Jacobs'

function setViewMode(value) {
    viewMode = value
}

function setFirstName(name) {
    firstName = name
    updateDOM()
}

function setLastName(name) {
    lastName = name
    updateDOM()
}
    
function handleFirstNameChange(e) {
    setFirstName(e.target.value)
}
  
function handleLastNameChange(e) {
    setLastName(e.target.value)
}

function handleFormSubmit(e) {
    e.preventDefault();
    setViewMode(!viewMode)
    updateDOM()
}

function updateDOM() {
    firstNameText.textContent = firstName
    lastNameText.textContent = lastName
    helloText.textContent = `Hello, ${firstName} ${lastName}!`
    if (viewMode) {
        editButton.textContent = 'Edit Profile'
        hide(firstNameInput);
        hide(lastNameInput);
        show(firstNameText);
        show(lastNameText);
    } else {
        editButton.textContent = 'Save Profile'
        hide(firstNameText);
        hide(lastNameText);
        show(firstNameInput);
        show(lastNameInput);
    }
}

function hide(el) {
    el.style.display = 'none';
}
  
function show(el) {
    el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;