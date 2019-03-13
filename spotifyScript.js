
require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');
const {base64encode} = require('nodejs-base64');
const createCsvWriter = require('csv-writer').createObjectCsvWriter; 

const encoded = base64encode(`${process.env.client_id}:${process.env.client_secret}`);
const playlist_id = process.env.playlist_id;
const playlist_url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
let access_token;

//Request Spotify Authorization
const req = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${encoded}`
    },
    body: "grant_type=client_credentials"
};

//Send Token Information
request(req, (err, res, body) => {
    if(res.statusCode === 200){
    	access_token = JSON.parse(body)["access_token"]
    	getData();
    } else {
    	console.log('error', err);
    }
});

//Request Spotify Playlist Album Art
const getData = () => {
	fetch(playlist_url, {
		headers:{
			'Authorization': `Bearer ${access_token}`
		}
	}).then( data => {
		return data.json();
	})
	.then( data => {
		dataToCSV(data.items)
	});
}


//Send Album Art Information to CSV File
const dataToCSV = (tracks) => {
	let allTracks = tracks
	let albumArtObj = [];

	allTracks.map((track, i) => {
		let title = track.track.name //targets title of song
		let artist = track.track.artists[0].name //targets artist
		let albumArt = track.track.album.images[0].url //targets images (640 x 640)

		return albumArtObj.push({
			number: i,
			title: title,
			artist: artist,
			albumArt: albumArt
		})
	})

	//Writing Array to CSV
	const csvWriter = createCsvWriter({  
	  path: './albumArt.csv',
	  header: [
	    {id: 'title', title: 'Title'},
	    {id: 'artist', title: 'Artist'},
	    {id: 'albumArt', title: 'Album Art'}
	  ]
	});

	csvWriter  
	.writeRecords(albumArtObj)
	.then(()=> console.log('The CSV file was written successfully'));

}


