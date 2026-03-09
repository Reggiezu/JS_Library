// ===== DOM refs =====
const booksDisplay = document.getElementById("displayCard");
const display = document.getElementById("BooksDisplay");
const newBookBtn = document.getElementById("addBtn");
const newBookForm = document.getElementById("newBookForm");

const nbTitle = document.getElementById("NBTitle");
const nbAuthor = document.getElementById("NBAuthor");
const nbPages = document.getElementById("NBPages");
const nbReadYes = document.getElementById("NBReadYes");
const nbReadNo = document.getElementById("NBReadNo");
const nbBtn = document.getElementById("NBBtn");


// ===== Library module (IIFE) =====
const Library = (function () {
  let myLibrary = [];

  function createBook(name, author, pages, read) {
    const id = crypto.randomUUID();

    function sayID() {
      console.log(`My Id is ${id}`);
    }

    function isRead(readValue) {
      return readValue === true ? "completed" : "Incomplete";
    }

    let readStatus = isRead(read);

    function toggleRead() {
      readStatus = readStatus === "completed" ? "Incomplete" : "completed";
      return readStatus;
    }

    return {
      id,
      name,
      author,
      pages,
      sayID,
      toggleRead,
      get read() {
        return readStatus;
      },
    };
  }

  function addBook(name, author, pages, read) {
    const book = createBook(name, author, pages, read);
    myLibrary.push(book);
    return book;
  }

  function getLibrary() {
    return myLibrary;
  }

  function deleteBook(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    return myLibrary;
  }

  return {
    createBook,
    addBook,
    getLibrary,
    deleteBook,
  };
})();


// ===== UI rendering =====
function renderBookCard(book) {
  const bookTitle = document.createElement("h4");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readStatus = document.createElement("p");
  const card = document.createElement("div");
  const contain = document.createElement("div");
  const deleteBtn = document.createElement("button");

  card.id = "displayCard";
  card.className = "card";
  contain.className = "container";
  bookTitle.id = "bookname";
  author.id = "author";

  booksDisplay.appendChild(card);
  card.appendChild(contain);
  contain.appendChild(bookTitle);
  contain.appendChild(author);
  contain.appendChild(pages);
  contain.appendChild(readStatus);
  contain.appendChild(deleteBtn);

  bookTitle.textContent = `${book.name}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Page count: ${book.pages}`;
  readStatus.innerHTML = `
    Status: ${book.read}
    <button class="readButton">Read</button>
  `;

  deleteBtn.textContent = "Delete";
  deleteBtn.id = book.id;

  const readBtn = readStatus.querySelector(".readButton");
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    displayLibrary();
  });

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleDeleteBook(book.id);
  });

  display.appendChild(booksDisplay);
}

function displayLibrary() {
  booksDisplay.innerHTML = "";
  Library.getLibrary().forEach((book) => {
    renderBookCard(book);
  });
}


// ===== Controller / handlers =====
function toggleBookForm(e) {
  e.preventDefault();
  newBookForm.style.display =
    newBookForm.style.display === "none" ? "block" : "none";
}

function handleAddBook(e) {
  e.preventDefault();

  const title = nbTitle.value;
  const author = nbAuthor.value;
  const pages = nbPages.value;
  const read = nbReadYes.checked === true ? true : false;

  console.log(read, author, pages, title);

  if (title !== "" && author !== "" && pages !== "") {
    Library.addBook(title, author, pages, read);
    displayLibrary();
  } else {
    alert("information is incomplete");
    return;
  }
}

function handleDeleteBook(id) {
  Library.deleteBook(id);
  displayLibrary();
}


// ===== Event listeners =====
newBookBtn.addEventListener("click", toggleBookForm);
nbBtn.addEventListener("click", handleAddBook);


// ===== Initial seed data =====
Library.addBook("Halo", "Mary Smith", 55, false);
Library.addBook("The Ref", "Batista", 345, true);

console.log(Library.getLibrary());
displayLibrary();