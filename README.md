# Spotify-Timeline
A web app that takes your Spotify account and creates a timeline of all your songs, when they were added and attempts to make playlists or 'eras' of your music listening history.

------

## Vision for version 1

### Summary
I want people to be able to log in to their Spotify accounts temporarily to go back
into their music history and make new playlists from the songs they added at a certain
period in time, effectively creating "eras" of music in a user's past.

#### Generates a User's Timeline
The app would generate a "timeline" for a user. It would be displayed as one long
central column down the middle of the page with pre-created playlists off to the side,
but pointing to a point on the central column, metaphorically the playlists point in
time.

#### Saves Generated Playlists to Spotify
Once a user has edited any playlist to their liking, they can choose to save it to their
account, or maybe open their Spotify client.

#### Full stop.
For now, that is the only use case, the site is designed to be used once or just a few
times by each user, relatively little, if any data would be stored per user.


---

### Implementation Ideas

#### Spotify API
* Log in user to Spotify
* Retrieve Songs, Playlists, etc. via API service
* Analyze user's Songs and group by date added
** According to a threshold set by user? (by weeks, months, years, etc.)
* User saves playlist through API service

#### Interface
* Pages
** Timeline view
** Landing Page/Login
* Components
** Login form
** Logout button

** Save playlist confirmation
** Timeline Item (Playlist, static element, etc.)
** Playlist in timeline view
*** includes ability to initiate save
** Save dialog/page
