import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SignIn from './components/signIn';

import axios from 'axios';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'

export default function App() {

  // discovery containing endpoints used by AuthSession hook
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  // state to store credentials
  const [creds, setCredentials] = useState({})
  const [tokens, setTokens] = useState({})

  // from AuthSession documentation Spotify example
  // hook meant for getting code
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: creds['clientId'],
      scopes: ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
        'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
        'playlist-modify-private', 'user-read-recently-played', 'user-top-read'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
      show_dialog: true
    },
    discovery
  );

  // When app loads, grab credentials from backend
  useEffect(() => {
    getCredentials();
  }, []);

  // useEffect(() => {
  //   if (response) {
  //     console.log(response)
  //   }
  // }, [response])

  // Grab secret credentials from backend
  const getCredentials = async () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/getCredentials'
    })
      // saving into state for use in API calls
      .then(res => {
        setCredentials(res.data);;
        console.log('Set creds to ', res.data)
      })
      // error
      .catch(e => { console.log("Error:", e) })
  }

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
            getTokens(res.params.code);
          }
        }

      })
      // error in call
      .catch(err => console.log('Error: ', err))
  }

  const getTokens = async (code) => {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${creds["credsB64"]}`,
        },
        body: {
          "grant_type": 'authorization_code',
          "code": code,
          "redirect_uri": creds["redirectUri"]
        },
        mode: 'cors'
      }
      // console.log("Sending request with: ", config)
      axios.post('http://127.0.0.1:3000/getTokens', config)
        // fetch('http://127.0.0.1:3000/getTokens', config)
        .then(res => console.log(res.status, res.statusText))
        .catch(e => { console.log(e) })
    } catch (e) {
      console.log('Error: ', e)
    }
  }


  // const getTokens = async () => {
  //   try {
  //     const authorizationCode = await getAuthorizationCode()
  //     const credsB64 = Buffer.from(creds.clientId + ":" + creds.clientSecret).toString('base64');
  //     const response = await fetch('https://accounts.spotify.com/api/token', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Basic ${credsB64}`,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${creds.redirectUri
  //         }`,
  //     });
  //     const responseJson = await response.json();
  //     // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
  //     const {
  //       access_token: accessToken,
  //       refresh_token: refreshToken,
  //       expires_in: expiresIn,
  //     } = responseJson;

  //     const expirationTime = new Date().getTime() + expiresIn * 1000;
  //     // await setUserData('accessToken', accessToken);
  //     // await setUserData('refreshToken', refreshToken);
  //     // await setUserData('expirationTime', expirationTime);
  //     console.log('accessToken: ', accessToken, "\nrefreshToken: ", refreshToken, "\nexpirationTime: ", expirationTime)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }


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
