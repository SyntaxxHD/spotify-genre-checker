const fetch = require('node-fetch')

module.exports = async playlistId => {
  if (!process.env.SPOTIFY_ACCESS_TOKEN) {
    throw new Error('Spotify access token is missing.')
  }

  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(name,artists(name)))`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data || !data.items || data.items.length === 0) {
        throw new Error('No tracks found in the playlist.')
      }

      const tracks = data.items.map(({ track }) => ({
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', ')
      }))
      return tracks
    })
    .catch(error => {
      return new Error(`Failed to fetch Spotify playlist details: ${error.message}`)
    })
}
