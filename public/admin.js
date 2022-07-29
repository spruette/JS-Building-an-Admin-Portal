
// Your Code Here

async function main(){
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(displayBook)
}

function displayBook(book){
    let bookContainer = document.querySelector('#root')
    let bookObject = document.createElement('li')
    bookObject.textContent = book.title

    let bookQuantity = document.createElement('input')
    bookQuantity.value = book.quantity
    bookObject.append(bookQuantity)

    let saveButton = document.createElement('button')
    saveButton.textContent = "Save"
    saveButton.addEventListener('click', async () =>{
        console.log(bookQuantity.value)
        let response1 = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: bookQuantity.value
            })
            
        })
    })
    bookObject.append(saveButton)

    let removeButton = document.createElement('button')
    removeButton.textContent = "Delete"
    removeButton.addEventListener('click', async () => {
        bookContainer.removeChild(bookObject)
        let response2 = await fetch(`http://localhost:3001/removeBook/${book.id}`, {
            method: 'DELETE' 
        })
    })
    bookObject.append(removeButton)
    // bookContainer.innerHTML += `
    //     <div class="d-flex flex-row">
    //         <div class="book-title">${book.title}</div>
    //         <input type="text" id="quantity" value="${book.quantity}">
    //         <button type="button" id="save-button">Save</button>
    //     </div>
    // `

    // Add a button to save the new quantity
    // const saveButton = bookContainer.querySelector('#save-button')
    
    // saveButton.addEventListener('click', async () => {
    //     console.log(book.quantity)
    //     let response = await fetch('http://localhost:3001/updateBook', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: book.id,
    //             quantity: book.quantity
    //         })
            
    //     })
    // })
    bookContainer.append(bookObject)

}




main()