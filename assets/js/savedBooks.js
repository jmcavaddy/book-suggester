// Initialize materialize carousel
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
  });


// Grab saved books from local storage
var savedBooks = JSON.parse(localStorage.getItem("savedBooks"));
console.log(savedBooks)

// Grab carousel element
var savedBookCarousel = document.querySelector("#savedBooks-carousel");

// Loop through saved books and add to carousel
for (var i = 0; i < savedBooks.bookList.length; i++) {
    console.log(savedBooks.bookList[i].coverImage)
    savedBookCarousel.innerHTML += 
    `<a class="carousel-item" href="#${i+1}!"><img src="${savedBooks.bookList[i].coverImage}"></a>
    `
    
}


// for (var i = 0; i < savedBooks.bookList.length; i++) {
//     console.log(savedBooks.bookList[i].coverImage)
//     savedBookCarousel.innerHTML = 
//     `<a class="carousel-item" href="#${i+1}!"><img src="${savedBooks.bookList[i].coverImage}"></a>
//     `
// }

    // 
