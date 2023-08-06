const express = require('express')
const open = require('open')
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

const getAccessToken = require('./getAccessToken')

const redirectUri = 'http://localhost:2973/callback'

module.exports = async main => {
  let server

  const clientId = process.env.SPOTIFY_CLIENT_ID
  if (!clientId) {
    throw new Error('SPOTIFY_CLIENT_ID environment variable is missing.')
  }

  // Create the server and the endpoint
  const app = express()

  app.use(express.static('pages'));

  app.get('/callback', async (req, res) => {
    try {
      const { code } = req.query

      if (!code) {
        throw new Error('Authorization code is missing.')
      }

      const { access_token, refresh_token } = await getAccessToken(code)

      console.log('Access token received')

      const tokens = {
        access_token,
        refresh_token
      }

      try {
        fs.writeJsonSync('tokens.json', tokens)
      } catch (error) {
        throw new Error(`An error occurred while writing tokens file. ${error.message}`)
      }

      process.env.SPOTIFY_ACCESS_TOKEN = access_token

      main()
      res.sendFile(path.resolve(__dirname, '../pages/success.html'))
    } catch (error) {
      console.error(chalk.red(error.message))
      res.sendFile(path.resolve(__dirname, '../pages/error.html'))
    } finally {
      server.close()
    }
  })

  // Start the server
  server = app.listen(2973, () => {
    open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-read-private`)
  })
}