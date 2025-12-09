//define variables
let myLibrary = [];
  const BooksDisplay = document.getElementById("displayCard")
const Display =document.getElementById("BooksDisplay")
const newBook = document.getElementById("addBtn")
const NBTitle = document.getElementById("NBTitle")
const newBookForm = document.getElementById("newBookForm")
const NBAuthor = document.getElementById("NBAuthor")
const NBBtn = document.getElementById("NBBtn")
const NBPages = document.getElementById("NBPages")
const NBReadYes = document.getElementById("NBReadYes")
const NBReadNo = document.getElementById("NBReadNo")



//open and close modal
newBook.addEventListener("click",(e)=>{
e.preventDefault();;
newBookForm.style.display === 'none' ? newBookForm.style.display='block':newBookForm.style.display='none'
})

//add new book from form
NBBtn.addEventListener("click",(e)=>{
e.preventDefault();;

const title = NBTitle.value;
const author = NBAuthor.value;
const pages = NBPages.value;
const read = NBReadYes.checked === true ? true:false;
console.log(read,author,pages,title)
if(title !='' && author !='' && pages != '' ){
addBookToLibrary(title,author,pages,read)
displayLibrary();
}else{
alert("information is incomplete")
return
}
})

//New book constructor
function Book(name, author,pages,read) {
    this.id= crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.sayID =() =>{
        console.log(`My Id is ${this.id}`)
    }
   this.isRead = (read) =>
  read === true ? "completed" : "Incomplete";
Book.prototype.toggleRead = function () {
  this.read = this.read === "completed" ? "Incomplete" : "completed";
  displayLibrary();
};

console.log("READ VALUE:", read);
this.read = this.isRead(read)
}

// Create new card element from the DOM
const newCard =(book)=>{
const bookTitle = document.createElement('h4')
const Author = document.createElement('p')
const pages = document.createElement('p')
const readStatus = document.createElement('p')
const Card = document.createElement("div")
const contain = document.createElement("div")
const DeleteBtn = document.createElement("button")
Card.id = 'displayCard';
Card.className='card';
contain.className='container';
bookTitle.id ='bookname'
Author.id='author'

BooksDisplay.appendChild(Card)
Card.appendChild(contain)
contain.appendChild(bookTitle)
contain.appendChild(Author)
contain.appendChild(pages)
contain.appendChild(readStatus)
contain.appendChild(DeleteBtn)



bookTitle.textContent= ` ${book.name}`
Author.textContent= `Author: ${book.author}`
pages.textContent= `Page count: ${book.pages}`
readStatus.innerHTML = `
  Status: ${book.read}
  <button class="readButton" data-id="${book}">Read</button>
`;
DeleteBtn.textContent="Delete";
DeleteBtn.id =`${book.id}`
const btn = readStatus.querySelector(".readButton");
btn.addEventListener("click", () => book.toggleRead());

DeleteBtn.addEventListener("click",(e)=>{
e.preventDefault();
id = book.id
deleteBook(id);
})
Display.appendChild(BooksDisplay)

}
// delete function
const deleteBook =(id)=>{
myLibrary = myLibrary.filter(book => book.id !== id)
displayLibrary();
}
//functon to display books
const displayLibrary = () =>{
BooksDisplay.innerHTML=""
  myLibrary.forEach(book => {
    newCard(book)
  });
}
//add new books to library
function addBookToLibrary(book,author,pages,read) {
  // take params, create a book then store it in the array
  const title = new Book(book,author,pages,read)
  myLibrary.push(title);
}

addBookToLibrary('Halo','Mary Smith',55,false)


addBookToLibrary('The Ref', 'Batista',345,true)
console.log(myLibrary)
displayLibrary();