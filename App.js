import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SignIn from './components/signIn';
import axios from 'axios';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'

const query = require('query-string')

export default function App() {

  // discovery containing endpoints used by AuthSession hook
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const CLIENT_ID = "3f260525a6374905ab85be85aa9b1242"

  const [accessToken, setAccessToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")



  // from AuthSession documentation Spotify example
  // hook meant for getting code
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
        'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
        'playlist-modify-private', 'user-read-recently-played', 'user-top-read'],
      usePKCE: true,
      redirectUri: makeRedirectUri(),
      show_dialog: true
    },
    discovery
  );

  // Getting code from authentication
  const getCode = async () => {
    // bring up dialog for user to authenticate with Spotify
    await promptAsync()
      // successful response from server
      .then(res => {
        // check if res returned an error. If not, continue
        if (!res.error) {
          // Check if state is the same for security
          if (res.params.state === request.state) {
            // make request for tokens
            // console.log("Got code: ", res.params.code, ". \nMaking request")
            getTokens(res.params.code, request.codeVerifier);
          }
        }
      })
      // error in call
      .catch(err => console.log('Error: ', err))
  }

  const getTokens = async (code, codeVerifier) => {

    const body = {
      code: code,
      code_verifier: codeVerifier,
      redirect_uri: request.redirectUri
    }

    axios.get('http://localhost:5001/betterwrapped/us-central1/app/getTokens', { params: body })
      .then(res => {
        const { access_token, refresh_token, expires_in } = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        console.log('Got first access token: ', access_token)
      })
      .catch(e => console.log(e))
  }

  const getRefreshedToken = async () => {

    const body = {
      refresh_token: refreshToken
    }

    axios.get('http://localhost:5001/betterwrapped/us-central1/app/getRefreshedToken', { params: body })
      .then(res => {
        const { access_token, refresh_token, expires_in } = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        console.log('Got new access token: ', access_token)
      })
      .catch(e => { console.log(e) })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SignIn onPress={getCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
