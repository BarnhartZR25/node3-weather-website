const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = '';
    messageTwo.textContent = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response => {
    response.json().then(( {error, forecast, location, address} = {} ) => {
        if (error) {
           return messageTwo.textContent = '', messageOne.textContent = error;
        }
        messageOne.textContent = '';
        messageTwo.textContent = `the ${forecast} for ${location}`;
    });
}));

});