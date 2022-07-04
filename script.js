const library = [];
const form = document.getElementById("book-form");
let formData = [];
const cards = document.querySelector(".cards");
let removeButtons = [];
let checkboxes = [];

form.addEventListener('submit', handleForm);
reloadDOM();

function Book(t, a, p, r) {
    this.title = t;
    this.author = a;
    this.pages = p;
    this.read = r;

    this.changeRead = function(status) {
        if (status === true) {
            this.read = true;
        }
        else {
            this.read = false
        }
    }
}

function addBookToLibrary() {
    window.prompt();

    let newBook = new Book();
    library.append(newBook);
}

function removeBook() {
    let index = this.parentNode.parentNode.getAttribute("data-index");
    library.splice(index, 1)
    reloadDOM();
}

function changeReadStatus() {
    let index = this.parentNode.getAttribute("data-index");
    library[index].changeRead(this.checked);

}

function handleForm(event) {
    event.preventDefault();
    Array.from(document.querySelectorAll(".form-package input")).forEach(item => {
        if (item.value === "on") {
            formData.push(item.checked)
        }
        else {
            formData.push(item.value)
        }
    });
    
    let newBook = new Book(formData[0], formData[1], formData[2], formData[3]);
    library.push(newBook);

    formData = [];

    reloadDOM();
}

function reloadDOM() {
    const items = document.querySelectorAll('.r');

    items.forEach(item => {
        item.remove();
    });

    library.forEach((item, index) => {
        cards.appendChild(createElement(item, index));
    })

    removeButtons = document.querySelectorAll(".remove-button");
    checkboxes = document.querySelectorAll(".read");

    removeButtons.forEach(item => {
        item.addEventListener("click", removeBook)
    })

    checkboxes.forEach(item => {
        item.addEventListener("change", changeReadStatus)
    })

    console.log(library)
}

function createElement(item, index) {

    let card = document.createElement("div");
    card.classList.add("card","r");
    card.setAttribute("data-index", index.toString());

    let remove = document.createElement("div");
    remove.classList.add("remove-div");

    let removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-button');
    removeBtn.setAttribute('type', 'button');
    removeBtn.innerText = "x";

    remove.appendChild(removeBtn)

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerText = item.title;

    let author = document.createElement("div");
    author.classList.add("author");
    author.innerText = item.author;

    let pages = document.createElement("div");
    pages.classList.add("pages");
    pages.innerText = item.pages;

    let checkbox = document.createElement("input");
    checkbox.classList.add("read");
    checkbox.setAttribute('type', 'checkbox')

    if (item.read === true) {
        checkbox.setAttribute('checked', '');
    }

    card.append(remove, title, author, pages, checkbox)

    return card;
}