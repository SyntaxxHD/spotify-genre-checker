const prompts = require('prompts')
const chalk = require('chalk')
require('dotenv').config()

const loadTokens = require('./authorization/loadTokens')
const getSpotifyPlaylistDetails = require('./fetching/getSpotifyPlaylistDetails')
const findSongOnBeatport = require('./fetching/findSongOnBeatport')

async function main() {
  const tokens = await loadTokens(main)

  if (tokens) {
    const response = await prompts([
      {
        type: 'text',
        name: 'link',
        message: 'Enter the Spotify playlist link:',
        validate: link => link.startsWith('https://open.spotify.com/playlist/') ? true : 'Invalid Spotify playlist link. It needs to start with https://open.spotify.com/playlist/'
      },
      {
        type: 'text',
        name: 'genre',
        message: 'Enter the genre:'
      }
    ])

    const { link, genre } = response

    if (!link || !genre) return

    const id = link.split('/').pop()

    const playlistDetails = await getSpotifyPlaylistDetails(id)

    for (let song of playlistDetails) {
      const beatPortSongDetails = await findSongOnBeatport(song.name, song.artist)

      if (beatPortSongDetails.length == 0) {
        // Song is not found on Beatport
        console.log(chalk.red(`${song.artist} - ${song.name}`))
      } else if (beatPortSongDetails.genre != genre) {
        // Song is found on Beatport but does not have the same genre
        console.log(chalk.yellow(`${song.artist} - ${song.name}`), chalk.bold.yellow(`(${beatPortSongDetails.genre})`))
      } else {
        // Song is found on Beatport and has the same genre
        console.log(chalk.green(`${song.artist} - ${song.name}`), chalk.bold.green(`(${beatPortSongDetails.genre})`))
      }
    }
  }
}

main().catch(error => console.error(chalk.red(error.message)))