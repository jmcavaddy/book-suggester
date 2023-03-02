// Global variables
let suggestABook = document.querySelector('#suggest-a-book')
let bookInfo = document.querySelector('#book-info')

// Header info for API request
let headers = {
    "Content-Type": 'application/json',
    "Authorization": '49360_c784f12cbac11f2eac0f14fa3fe52485'
}

// For now, this is how I will generate a random ISBN number:

// This is my list of ISBNs that I know are actually books;
// Source for this list:
// https://www.theguardian.com/news/datablog/2011/jan/01/top-100-books-of-all-time#data
let RandomIsbn = [
    '9780061120084',
    '9780552149518',
    '9780747532743',
    '9780747538486',
    '9780552150736',
    '9780747551003',
    '9780747581086',
    '9780747591054',
    '9780747546290',
    '9781904233657',
    '9780747550990',
    '9780552151764',
    '9781904233886',
    '9780330457729',
    '9780552151696',
    '9780099450252',
    '9781904233916',
    '9781847245458',
    '9780747566533',
    '9780099464464',
    '9780141017891',
    '9780099429791',
    '9780593054277',
    '9780552997041',
    '9781905654284',
    '9780747546245',
    '9780747591061',
    '9781849163422',
    '9780752837505',
    '9780349116754',
    '9780718147655',
    '9780006512134',
    '9780099387916',
    '9780752877327',
    '9780755309511',
    '9781841953922',
    '9780091889487',
    '9780747599876',
    '9780749397548',
    '9780563384304',
    '9780330507417',
    '9781861976123',
    '9780590660549',
    '9780755331420',
    '9781849162746',
    '9780330367356',
    '9780141020525',
    '9780722532935',
    '9780552996006',
    '9780099487821',
    '9780141011905',
    '9780718154776',
    '9780099457169',
    '9780330332774',
    '9780241003008',
    '9780747582977',
    '9781846051616',
    '9780718147709',
    '9780755307500',
    '9780141030142',
    '9780007110926',
    '9780330448444',
    '9780747561071',
    '9780701181840',
    '9780099771517',
    '9780563384311',
    '9780590112895',
    '9780718148621',
    '9781904994367',
    '9781861978769',
    '9780718152437',
    '9780140276336',
    '9780007156108',
    '9780593059258',
    '9780752893686',
    '9780007207329',
    '9780552998482',
    '9780718144395',
    '9780006498407',
    '9780747563204',
    '9781847670946',
    '9780007232741',
    '9780099419785',
    '9780747581109',
    '9780099406136',
    '9780552149525',
    '9780140237504',
    '9780593050545',
    '9780718144845',
    '9780552771153',
    '9780141019376',
    '9780552772747',
    '9780552773898',
    '9780141022925',
    '9780316731317',
    '9781904994497',
    '9780439993586',
    '9780552771108',
    '9780552997034',
    '9780099506928',
    '9781846053443',
]

// This function randomly selects an ISBN number from the list above
let chooseRandomIsbn = function() {
    let randomIsbn = RandomIsbn[Math.floor(Math.random() * RandomIsbn.length)]
    let requestUrl = `https://api2.isbndb.com/book/${randomIsbn}`
    return requestUrl
}


// let randomIsbn = chooseRandomIsbn()


// This function fetches the book info from the API
let fetchBookInfo = function() {
    
    let requestUrl = chooseRandomIsbn();
    fetch(requestUrl, {headers: headers})
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            updateWithBookInfo(data)
        })
        .catch(function (error) {
            console.error('Error:', error)
        });
}

// This function updates the page with the book info
let updateWithBookInfo = function(data) {
    // Update the suggest a book button
    suggestABook.textContent = "Suggest Another Book!";

    // The API returns the author's name as "Lastname, Firstname"
    // This function returns it as "Firstname Lastname"
    let createPrintedName = function (data) {
        let nameArray = data.book.authors[0].split(", ");
        let lastName = nameArray[0];
        let firstName = nameArray[1];
        let printedName = `${firstName} ${lastName}`;
        return printedName;

    }
    let printedName = createPrintedName(data);

    // Update the page with the book info and add a button to save the book
    bookInfo.innerHTML = 
        `<img class="book-details book-cover" src="${data.book.image}" alt="Book cover for ${data.book.title}">
        <h2>Try ${data.book.title},</h2>
        <h3>a novel by ${printedName}</h3>
        <div class="book-details">
            <p>Length: ${data.book.pages} pages.</p>
            <p>Published by ${data.book.publisher} in ${data.book.date_published}</p>

        </div>
        <a id="save-book" class="waves-effect waves-light btn red lighten-3"><i class="material-icons right">add</i>Add this book to your Saved Books!</a>


    `



    let saveBookBtn = document.querySelector('#save-book')

   

    // Add an event listener to the save book button
    saveBookBtn.addEventListener("click", function() {

        // Check localStorage to see if this book is already saved
        // If it is, don't save it again and change button text to
        // "Book has already been saved!"

        // If it isn't, save it to localStorage and change button text to
        // "Book Saved!"

        // Get the saved books from localStorage

        // Function to save book data to localStorage
        let saveBookToLocalStorage = function(data) {

            var savedBooks = JSON.parse(localStorage.getItem("savedBooks"));

            
            let saveBookData = {
                title: data.book.title,
                coverImage: data.book.image,
                authorName: printedName,
            }

            savedBooks.bookList.push(saveBookData)

            localStorage.setItem("savedBooks", JSON.stringify(savedBooks))
        }

        // If there are no saved books, save the current book to localStorage
        if (savedBooks === null) {
            savedBooks = {bookList: []};
            localStorage.setItem("savedBooks", JSON.stringify(savedBooks))
            saveBookToLocalStorage(data);
            saveBookBtn.textContent = "Book Saved!";
            saveBookBtn.classList.add("disabled");
            return;
        } else {
            // loop through the saved books to see if the current book is already saved
            for (let i = 0; i < savedBooks.bookList.length; i++) {
                if (savedBooks.bookList[i].title === data.book.title) {
                    saveBookBtn.textContent = "Book has already been saved!";
                    saveBookBtn.classList.add("disabled");
                    return;
                } else {
                // If the book isn't already saved, save it to localStorage
                    saveBookToLocalStorage(data);
                    saveBookBtn.textContent = "Book Saved!";
                    saveBookBtn.classList.add("disabled");
                    return;
                }
            }
        };

    });

}


// This event listener runs the fetchBookInfo function when the user clicks the 
// suggest a book button
suggestABook.addEventListener("click",fetchBookInfo)

