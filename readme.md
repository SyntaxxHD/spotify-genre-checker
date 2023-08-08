# Spotify Playlist Genre Checker

This is a Node.js application that goes through a Spotify playlist and checks on Beatport if the users prompted genre does match the genre of the tracks inside the playlist.

## Windows Users

### Getting Started (Windows)

Follow these steps to run the application on Windows:

1. **Download the Executable**

   - Visit the "Releases" tab on the [GitHub repository page](https://github.com/SyntaxxHD/spotify-genre-checker/releases).
   - Download the latest executable version for Windows (`spotify-genre-checker.exe`).

2. **Create a Spotify Developer Account and Obtain Client Credentials**

   - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
   - Log in with your Spotify account, or create a new one if you don't have one already.
   - Once you're logged in, click on "Create app" and fill in the necessary information.
   - Make sure you add `http://localhost:2973/callback` to "Redirect URIs"
   - After creating the app, you will be provided with a client ID and client secret. Keep these handy for the next step.

3. **Set Up the Application**

   - Create a `.env` file in the programs directory and add your Spotify client ID and client secret:

     ```properties
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     ```

4. **Run the Executable**

   - Locate the downloaded executable file (`spotify-genre-checker.exe`).
   - Open a terminal in that folder and run `spotify-genre-checker.exe`. Otherwise the window will close after the program exits.

## Other Operating Systems (macOS and Linux)

### Getting Started (macOS and Linux)

Follow these steps to run the application on macOS and Linux:

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

     ```bash
     git clone https://github.com/SyntaxxHD/spotify-genre-checker.git
     ```

   - Navigate into the project directory:

     ```bash
     cd spotify-genre-checker
     ```

   - Install the required dependencies by running:

     ```bash
     npm install
     ```

   - Create a `.env` file in the project directory and add your Spotify client ID and client secret:

     ```properties
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     ```

4. **Run the Application**

   You can now run the application using the following command:

   ```bash
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
