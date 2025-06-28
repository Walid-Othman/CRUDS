let body = document.body
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let categry = document.getElementById('gategry')
let submit = document.getElementById('submit')
let search = document.getElementById('search')
let searchTitle = document.getElementById('stitle')
let searchGategry = document.getElementById('sgategry')
let clear = document.getElementById('clear')
let i
let mood = 'create'


// get total



let culclat = [price, taxes, ads, discount];
let btnclear = null
culclat.forEach(function (u) {
    u.addEventListener("keyup", function () {
        if (price.value != "") {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.innerHTML = result;
            total.style.background = 'green';
            total.style.color = '#fff';
            if (!btnclear) {
                btnclear = document.createElement('button')
                btnclear.textContent = 'clear'
                clear.appendChild(btnclear)

                //   btnclearstyle
                btnclear.style.marginTop = '10px';
                btnclear.style.borderRadius = '5px';
                btnclear.style.border = 'none'
                btnclear.style.backgroundColor = '#ff4d4d';
                btnclear.style.color = 'white';
                btnclear.style.height = '40px';
                btnclear.style.width = '80px';

                btnclear.addEventListener('click', function () {
                    total.innerHTML = ""
                    price.value = ''
                    taxes.value = ''
                    ads.value = ''
                    discount.value = ''
                    btnclear.remove()
                    btnclear = null
                    total.style.background = 'wheat'
                    total.style.color = 'black'
                })
            }
        } else {
            total.innerHTML = '';
            total.style.background = 'wheat'
            total.style.color = 'black'

        }
    });
});






// creat product

let dataProdect;
if (localStorage.getItem('prodect')) {
    dataProdect = JSON.parse(localStorage.getItem('prodect'))
} else {
    dataProdect = [];
}

submit.addEventListener('click', function () {
    let prodectPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        categry: categry.value,
    }
    // عمل نسخ متعدده من العنصر 

    if (title.value != '' && price.value != '' && categry.value != '' && count.value <= 100) {
        if (mood === 'create') {
            if (prodectPro.count > 1) {
                for (let y = 0; y < prodectPro.count; y = y + 1) {
                    dataProdect.push(prodectPro)
                }
            } else { dataProdect.push(prodectPro) }
        } else {
            dataProdect[i] = prodectPro
            submit.textContent = 'create'
            count.style.display = 'block'
            mood = 'create'

        } clearData();

        localStorage.setItem('prodect', JSON.stringify(dataProdect))

    }

    else {

        if (title.value === '') {
            title.focus()
            title.style.background = 'red'
            title.placeholder = 'Please enter a title'
        } else if (price.value === '' || price.value < 1) {
            price.focus()
            price.style.background = 'red'
            price.placeholder = 'Please enter a price'
        }
        else if (categry.value === '') {
            categry.focus()
            categry.style.background = 'red'
            categry.placeholder = 'Please enter the type'
        }
        else if (count.value > 100) {
            count.focus()
            count.value = ''
            count.style.background = 'red'
            count.placeholder = 'Please choose from 1 to 100'
        }




    }

    readData();


})

title.addEventListener('input', function () {
    title.style.background = ''
    title.placeholder = 'title'
})

price.addEventListener('input', function () {
    price.style.background = ''
    price.placeholder = ' price'
})

categry.addEventListener('input', function () {
    categry.style.background = ''
    categry.placeholder = ' category'
})

count.addEventListener('input', function () {
    count.style.borderColor = ''
    count.placeholder = ' count'
})

readData();








// clear data

function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    categry.value = ''
    // btnclear.remove()
    total.style.background = 'wheat'
    total.style.color = 'black'

}



// save localstorge

// impty input

// read

function readData() {

    let tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    dataProdect.forEach(function (item, index) {
        let tr = document.createElement('tr')
        tr.innerHTML = `
<td>  ${index + 1} </td>
<td>  ${item.title} </td>
<td>  ${item.price} </td>
<td>  ${item.taxes} </td>
<td>  ${item.ads} </td>
<td>  ${item.discount} </td>
<td>  ${item.total} </td>
<td>  ${item.categry} </td>
<td> <button onclick='update(${index})' id="update">update</button></td>
<td> <button onclick="deleteData(${index})" id="delete">Delete</button></td>
`
        tbody.appendChild(tr)




    })

    // create button for delete all tabel data

    let deleteAll = document.getElementById('deleteAll')
    deleteAll.innerHTML = ''
    if (dataProdect.length > 0) {
        let btnDeleteAll = document.createElement('button')
        btnDeleteAll.textContent = `Delete All (${dataProdect.length}) `
        deleteAll.appendChild(btnDeleteAll)
        btnDeleteAll.addEventListener('click', function () {
            dataProdect = []
            localStorage.removeItem('prodect')
            readData()
        })
    }


}

// count





// delete

function deleteData(index) {
    dataProdect.splice(index, 1)
    localStorage.prodect = JSON.stringify(dataProdect)
    readData()
}


// update

function update(index) {
    title.value = dataProdect[index].title
    price.value = dataProdect[index].price
    taxes.value = dataProdect[index].taxes
    ads.value = dataProdect[index].ads
    discount.value = dataProdect[index].discount
    categry.value = dataProdect[index].categry
    total.innerHTML = dataProdect[index].total
    count.style.display = 'none'
    submit.textContent = 'update'
    mood = 'update'
    i = index
    total.style.background = 'green';
    total.style.color = '#fff';





    window.scroll({
        top: 0,
        behavior: 'smooth'
    })






}
// search

let searchMode = 'title'
if (searchMode === 'title') {
    search.placeholder = 'Search by title'
}

searchTitle.addEventListener('click', function () {
    search.placeholder = 'Search by title'
    search.focus()
    searchMode = 'title'
    search.value = ''
    readData()

})

searchGategry.addEventListener('click', function () {
    search.placeholder = 'Search by category'
    search.focus()
    searchMode = 'catogry'
    search.value = ''
    readData()
})



search.addEventListener('keyup', function () {
    // let data = search.value
    let tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    if (searchMode === 'title') {
        for (z = 0; z < dataProdect.length; z++) {
            if (dataProdect[z].title.toLowerCase().includes(search.value.toLowerCase())) {


                let tr = document.createElement('tr')
                tr.innerHTML += `
<td>  ${z + 1} </td>
<td>  ${dataProdect[z].title} </td>
<td>  ${dataProdect[z].price} </td>
<td>  ${dataProdect[z].taxes} </td>
<td>  ${dataProdect[z].ads} </td>
<td>  ${dataProdect[z].discount} </td>
<td>  ${dataProdect[z].total} </td>
<td>  ${dataProdect[z].categry} </td>
<td> <button onclick='update(${z})' id="update">update</button></td>
<td> <button onclick="deleteData(${z})" id="delete">Delete</button></td>
`
                tbody.appendChild(tr)


            }


        }
    }

    else {
        let tbody = document.getElementById('tbody')
        tbody.innerHTML = ''

        for (z = 0; z < dataProdect.length; z++) {
            if (dataProdect[z].categry.toLowerCase().includes(search.value.toLowerCase())) {


                let tr = document.createElement('tr')
                tr.innerHTML += `
<td>  ${z + 1} </td>
<td>  ${dataProdect[z].title} </td>
<td>  ${dataProdect[z].price} </td>
<td>  ${dataProdect[z].taxes} </td>
<td>  ${dataProdect[z].ads} </td>
<td>  ${dataProdect[z].discount} </td>
<td>  ${dataProdect[z].total} </td>
<td>  ${dataProdect[z].categry} </td>
<td> <button onclick='update(${z})' id="update">update</button></td>
<td> <button onclick="deleteData(${z})" id="delete">Delete</button></td>
`
                tbody.appendChild(tr)


            }


        }

    }

})





// clean data

readData()


// up 

let btnUp = document.getElementById('btnUp')


window.addEventListener('scroll', function () {
    if (window.scrollY < (600)) {
        btnUp.classList.add('hide')
    } else {
        btnUp.classList.remove('hide')
    }
})

btnUp.addEventListener('click', function () {
    window.scroll({
        top: 0,
        behavior: 'smooth'

    })
})

// dark mood 
let footer = document.getElementById('footer')


if (
    localStorage.getItem(('mood')) === 'dark'
) {
    body.classList.add('dark')
} else {
    body.classList.remove('dark')
}


let dark = document.getElementById('dark')
dark.addEventListener('click', function () {
    body.classList.toggle('dark')
    if (body.classList.contains('dark')) {
        localStorage.setItem('mood', 'dark')
        dark.textContent = '☀️'
        dark.style.background='gray'
        footer.style.background = ' rgb(83, 82, 80'
       
    } else {
        localStorage.setItem('mood', 'light')
         dark.textContent = '🌙'
         dark.style.background='rgb(226, 214, 200)'
           footer.style.background = 'rgb(226, 214, 200)'
    }

})


