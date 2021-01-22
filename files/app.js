
// Create a new date instance dynamically with JS
let d = new Date();
let theDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// after zip you must enter the zipCode then &appid=apiKey

// Personal API Key for OpenWeatherMap API
// Please enter your own api key
const apiKey = '';

const fullApiKey = '&appid=' + apiKey + '&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  // the input value
  const zip = document.getElementById('zip').value;

  // if condition to check if the user enter zip code or not
  if(zip === '') {
    alert('No zip code provided');

  } else {

    // The text area value
    let userResponse = document.getElementById('feelings').value;

    getRequest(baseurl, zip, fullApiKey)

    .then(function(data) {
      addData('/add', {temp: data.main.temp, date: theDate, userResponse: userResponse});
    })

    .then(function() {
      updateUi();
    });

  }
  
}

/* Function to GET Web API Data*/
const getRequest = async (baseurl, zip, fullApiKey) => {

  const res = await fetch(baseurl+zip+fullApiKey);

  try{
    const newData = await res.json();
    return newData;

  } catch(error) {
    console.log('Error', error);
  }
}

/* Function to POST data */
const addData = async (url = '', data = {}) => {

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  try{
    const newEntery = await res.json();
    return newEntery
    
  } catch(error) {
    console.log('Error', error);
  }
}

/* Function to GET Project Data */
const updateUi = async () => {
  const res = await fetch('/all')
  try{
    const allData = await res.json();
      
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.userResponse;

  } catch(error) {
    console.log('Error', error);
  }
}