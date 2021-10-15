
console.log('Client-side code running');

// var actualCounter = 0

const button = document.getElementById('myButton');
button.addEventListener('click', function (e) {
  console.log('button was clicked');

  fetch('/clicked', { method: 'POST' })
    .then(function (response) {
      if (response.ok) {
        let cntr = response.statusText();
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .then(function (data) {
      // actualCounter++;
      // document.getElementById('counter').innerHTML = `Button was clicked ${actualCounter} times`;

    })
    .catch(function (error) {
      console.log(error);
    });
});
