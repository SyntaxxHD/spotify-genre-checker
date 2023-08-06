const chalk = require('chalk')
const fetch = require('node-fetch')

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

module.exports = async refresh_token => {
  if (!clientId || !clientSecret) {
    throw new Error(chalk.red('Missing Spotify client credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.'))
  }

  // Encoding client credentials in base64
  const base64creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refresh_token)

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
    headers: {
      'Authorization': `Basic ${base64creds}`, // Using Basic auth with base64 encoded client credentials
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (!data.access_token) {
        throw new Error(`Access token is not available.` + (data.error_description ? ` ${data.error_description}` : ''))
      }

      return {
        access_token: data.access_token,
        refresh_token: refresh_token
      }
    })
    .catch(error => {
      throw new Error(`An error occurred during token exchange: ${error.message}`)
    })
}