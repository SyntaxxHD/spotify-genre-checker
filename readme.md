# Spotify Playlist Genre Checker

This is a Node.js application that checks the genre of songs in a Spotify playlist against the Beatport music platform. It uses the Spotify and Beatport APIs to retrieve song and genre information.

## Getting Started

Here are the steps you need to follow to run this application:

1. **Install Node.js**

   If you do not have Node.js installed on your machine, you can download it from the [official Node.js website](https://nodejs.org/). Choose the LTS (Long Term Support) version that's appropriate for your OS.

2. **Create a Spotify Developer Account and Obtain Client Credentials**

   - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
   - Log in with your Spotify account, or create a new one if you don't have one already.
   - Once you're logged in, click on "Create app" and fill in the necessary information.
   - Make sure you add `http://localhost:2973/callback` to "Redirect URIs"
   - After creating the app, you will be provided with a client ID and client secret. Keep these handy for the next step.

3. **Clone and Set Up the Application**

   - Clone this repository to your local machine by running the following command in your terminal:

     ```
     git clone [repository_url]
     ```

   - Navigate into the project directory:

     ```
     cd [project_directory]
     ```

   - Install the required dependencies by running:

     ```
     npm install
     ```

   - Create a `.env` file in the project directory and add your Spotify client ID and client secret:

     ```
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     ```

4. **Run the Application**

   You can now run the application using the following command:

   ```
   node index.js
   ```

## Usage

When you run the application, it will prompt you to enter a Spotify playlist link and a genre. The application will then retrieve the songs from the playlist and check their genres on Beatport.

The application will display the following information for each song:

- If the song is found on Beatport and has the same genre, it will be displayed in green.
- If the song is found on Beatport but does not have the same genre, it will be displayed in yellow.
- If the song is not found on Beatport, it will be displayed in red.

## License

This project is licensed under the [MIT License](LICENSE).