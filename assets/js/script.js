// Header info for API request
let headers = {
    "Content-Type": 'application/json',
    "Authorization": '49360_c784f12cbac11f2eac0f14fa3fe52485'
}


// Ideally, this would be a function that generates a random ISBN number
// but I'm not sure how to only find ISBNs that are in the database without
// tons of API hits/are actually books. 
// So, I'm randomly selecting an ISBN number from a list of ISBNs that I know
// are in the database/are actually books.

// let genIsbn = function() {
//     let isbn = '1'
//     for (let i = 0; i < 9; i++) {
//         isbn += Math.floor(Math.random() * 10)
//     }
//     return isbn
// }

// let randomIsbn = genIsbn()

// For now, this is how I will generate a random ISBN number:

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

let randomIsbn = chooseRandomIsbn()


// requestUrl = `https://api2.isbndb.com/book/${randomIsbn}`
 
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
