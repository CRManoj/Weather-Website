//To select the form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#image')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    //to show as it is loading
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    messagethree.textContent = ''
    messagefour.textContent = ''
    messagefive.src=''


    fetch('/weathers?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            //displaying the information and image
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.temp
            messagethree.textContent = data.forecast.weat
            messagefour.textContent = data.forecast.rain
            messagefive.src = data.forecast.imag
        }
    })
})
})

