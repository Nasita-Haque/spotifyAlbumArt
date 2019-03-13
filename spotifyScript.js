
require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');
const {base64encode} = require('nodejs-base64');

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
		console.log('data', data)
	});

}


//Send Album Art Information to CSV File



