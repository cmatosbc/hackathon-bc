import { apiKey, apiHost } from './config.js';

export default function ( term ) {
	var myHeaders = new Headers();
	myHeaders.append("X-RapidAPI-Key", apiKey);
	myHeaders.append("X-RapidAPI-Host", apiHost);
	myHeaders.append("Content-type", "application/json");

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	const response = fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search=" + term, requestOptions)
	  .then((data) => data.json())
	  .then((data) => {
	  	let parsed = { ...data };
	  	let results = [];
	  	parsed.response.forEach( (element, index) => {
	  		results.push({
	  			teamName: element.team.name,
	  			teamCode: element.team.code,
	  			teamId: element.team.id,
	  			venueId: element.venue.id
	  		});
	  	});
	  	
	  	return results;
	  })
	  .catch(error => console.log('error', error));

	  if(response) {
	  	return response;
	  }
}
