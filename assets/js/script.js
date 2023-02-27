let headers = {
    "Content-Type": 'application/json',
    "Authorization": '49360_c784f12cbac11f2eac0f14fa3fe52485'
}

let genIsbn = function() {
    let isbn = '1'
    for (let i = 0; i < 9; i++) {
        isbn += Math.floor(Math.random() * 10)
    }
    return isbn
}

let randomIsbn = genIsbn()

console.log(randomIsbn)

requestUrl = `https://api2.isbndb.com/book/${randomIsbn}`
 
fetch(requestUrl, {headers: headers})
    .then(function (response) {
        return response.json();
    })
    .then( function(data) {
        console.log(data)
    })
    .catch(function (error) {
        console.error('Error:', error)
    });