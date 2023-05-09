import { apiKey, apiHost } from './config.js';

export default function ( term ) {
	var myHeaders = new Headers();
	myHeaders.append("X-RapidAPI-Key", "784166e8damshc6d584f31ac3909p179b89jsn9d778e3690a7");
	myHeaders.append("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com");
	myHeaders.append("Content-type", "application/json");

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search=" + term, requestOptions)
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
	  	console.log(results);
	  })
	  .catch(error => console.log('error', error));
}
