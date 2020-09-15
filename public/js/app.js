const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    search.value = ''

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    weatherIcon.src = ''

    fetch(`/weather?address=${address}`)
        .then((response) =>
            response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                weatherIcon.src = data.icon
            }
        })
        .catch((error) => console.log(error))
})

