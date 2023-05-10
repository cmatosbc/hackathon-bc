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
  
  fetch("https://api-football-v1.p.rapidapi.com/v3/players?season=2022&team=" + term, requestOptions)
	  .then((data) => data.json())
	  .then((data) => {
		let parsed = { ...data };
		let results = [];
		parsed.response.forEach( (element, index) => {
		  results.push({
			playerName: element.player.name,
			playerFirstname: element.player.firstname,
			playerLastname: element.player.lastname,
			playerAge: element.player.age,
			playerBirthDate: element.player.birth.date,
			playerBirthPlace: element.player.birth.place,
			playerBirthCountry: element.player.birth.country,
			playerNationality: element.player.nationality,
			playerHeight: element.player.height,
			playerWeight: element.player.weight,
			playerInjured: element.player.injured,
			playerPhoto: element.player.photo,
			LeagueId: element.statistics.league.id,
			LeagueName: element.statistics.league.name,
			LeagueLogo: element.statistics.league.logo,
			playerGames: element.statistics.games.appearances,
			playerRating: element.statistics.games.rating,
			playerGoals: element.statistics.goals.total,
			playerAssists: element.statistics.goals.assists,
			playerYellows: element.statistics.cards.yellow,
			playerReds: element.statistics.cards.red
		  });
		});
		console.log(results);
	  })
	  .catch(error => console.log('error', error));
}

