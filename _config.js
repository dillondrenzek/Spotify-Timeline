module.exports = {
	spotify: {
    accounts: {
      baseUrl: 'https://accounts.spotify.com'
    },
		client_id: '68cbe79b60c240079457182cbca17761',
		client_secret: '489789cfc24e4e6db02094bd7e2f3719',
		redirect_uri: 'http://localhost:8081/spotify/users/authorize/callback',
		scopes: [
			'playlist-modify-public',
			'playlist-modify-private',
			'streaming',
			'user-library-read',
			'user-library-modify',
			'user-read-birthdate',
			'user-top-read'
		]
	}
}

// stateKey: string = 'spotify_auth_state';
// response_type: string = 'token';
// client_id: string = '68cbe79b60c240079457182cbca17761';
// redirect_uri: string = 'http://localhost:8081/';
