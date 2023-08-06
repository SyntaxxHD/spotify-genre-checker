const fetch = require('node-fetch')
const FuzzySet = require('fuzzyset')

module.exports = async (songName, spotifyArtists) => {
  // Split the Spotify artists by comma and take the first one as main artist
  const mainArtist = spotifyArtists.split(',')[0].trim()

  return fetch(`https://www.beatport.com/_next/data/Y__xxtotwfbe0qXHMmbP1/search.json?q=${encodeURIComponent(songName + ' ' + mainArtist)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      const tracks = data.pageProps.dehydratedState.queries[0].state.data.tracks.data

      // Check if the songs data is available
      if (tracks.length > 0) {
        const track = tracks[0]

        const fuzzyArtists = FuzzySet(track.artists.map(artistObj => artistObj.artist_name.toLowerCase()))
        const match = fuzzyArtists.get(mainArtist.toLowerCase())

        // If there's no match (match == null), or the match score is below threshold 0.5, return empty array
        if (!match || match[0][0] < 0.5) {
          return []
        }

        const genreNames = track.genre.map(genre => genre.genre_name).join(', ')

        return {
          title: track.track_name,
          genre: genreNames
        }
      } else {
        throw new Error('Failed to fetch track details from Beatport')
      }
    })
    .catch(error => {
      throw new Error(`Failed to fetch track details from Beatport: ${error.message}`)
    })
}