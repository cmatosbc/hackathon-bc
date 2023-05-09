

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
	  .then((data) => {
	  	return data;
	  })
	  .then(result => result.json())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}