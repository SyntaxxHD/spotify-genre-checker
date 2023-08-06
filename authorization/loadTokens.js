const fs = require('fs-extra')

const startAuthorizationFlow = require('./startAuthorizationFlow')
const getNewAccessToken = require('./getNewAccessToken')

module.exports = async main => {
  let tokens
  try {
    tokens = fs.readJsonSync('tokens.json')
  } catch (error) {
    // If the file doesn't exist, start authorization process
    if (error.code === 'ENOENT') {
      console.log('No tokens file found. Starting the authorization flow...')
      await startAuthorizationFlow(main)
    } else {
      throw new Error(`An error occurred while reading tokens file. ${error.message}`)
    }
    return null
  }

  if (!tokens.refresh_token) {
    throw new Error('Refresh token is missing in tokens file.')
  }

  // If the tokens file exists, continue executing the application
  // Get and set new access token using refresh token
  const { access_token, refresh_token } = await getNewAccessToken(tokens.refresh_token)

  process.env.SPOTIFY_ACCESS_TOKEN = access_token

  // Saving the new access token
  tokens.access_token = access_token
  try {
    fs.writeJsonSync('tokens.json', tokens)
  } catch (error) {
    throw new Error(`An error occurred while writing tokens file. ${error.message}`)
  }

  return tokens
}