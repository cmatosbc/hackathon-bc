import { apiKey, apiHost } from './config.js';

export default async function ( term ) {

	let results = [];

	var myHeaders = new Headers();
	myHeaders.append("X-RapidAPI-Key", apiKey);
	myHeaders.append("X-RapidAPI-Host", apiHost);
	myHeaders.append("Content-type", "application/json");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	await fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search=" + term, requestOptions)
		.then((data) => data.json())
		.then((data) => {
			let parsed = { ...data };

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

	return results;

	// console.log('Venue: ' + venueId);
	//
	// if (venueId) {
	//   fetch("https://api-football-v1.p.rapidapi.com/v3/venues?id=" + venueId, requestOptions)
	// 	  .then((data) => data.json())
	// 	  .then((data) => {
	// 		let parsed = { ...data };
	// 		let results = [];
	// 		parsed.response.forEach( (element, index) => {
	// 		  results.push({
	// 			venueName: element.name,
	// 			venueImage: element.image
	// 		  });
	// 		});
	// 		console.log(results);
	// 	  })
	// 	  .catch(error => console.log('error', error));
	// }
}