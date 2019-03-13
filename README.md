This is a Spotify Album Art grabber tool. 

How to use tool:
Step 1: Make sure to add your client_id and client_secret to the .env file. 
*These variables will be included in as process.env on the spotifyScript.js file.*

Step 2: Make sure to add your playlist_id to the .env file as well. 
*You can access the playlist_id  by right clicking on the Spotify Playlist and copying the spotify URL or the spotify URL link from the address bar*

Step 3: To run the code, `node spotifyScript.js`
*This will make sure to copy the album art (currently set at largest size 640 x 640), title and artist to the csv file. Please check csv file for updated information*