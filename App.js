import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SignIn from './components/signIn';
import { useAuthRequest } from 'expo-auth-session';
import axios from 'axios';

const CLIENT_ID = '3f260525a6374905ab85be85aa9b1242';

const config = {
  clientId: CLIENT_ID,
  redirectUri: 'exp://127.0.0.1:19000',
  scopes: ['user-read-playback-position', 'user-read-recently-played', 'user-top-read'],
};

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {

  const [request, response, promptAsync] = useAuthRequest(config, discovery);


  useEffect(() => {
    if (response) {
      const { code } = response.params;
      const codeVerifier = request.codeVerifier;
      getTokens(code, codeVerifier)
    }
  }, [response])

  const getTokens = async (code, codeVerifier) => {
    axios.request(discovery.tokenEndpoint, {
      method: "POST",
      params: {
        grant_type: "authorization_code",
        code,
        redirectUri: request.redirectUri,
        clientId: CLIENT_ID,
        code_verifier: codeVerifier
      }
    })
      .then(res => console.log(res))
      .catch(e => console.log('Error!: ', e))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SignIn onPress={promptAsync} />
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
