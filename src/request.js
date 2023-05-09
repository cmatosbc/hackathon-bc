

export default function ( term ) {
  
  import { apiKey, apiHost } from './config.js';
  
  var myHeaders = new Headers();
	myHeaders.append("X-RapidAPI-Key", apiKey);
	myHeaders.append("X-RapidAPI-Host", apiHost);
	myHeaders.append("Content-type", "application/json");

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search=" + term, requestOptions)
	  .then((data) => {
	  	return data;
	  })
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}