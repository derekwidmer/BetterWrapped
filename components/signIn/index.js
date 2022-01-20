import React, { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTokens } from '../../redux/tokenSlice';
import { StatusBar } from 'expo-status-bar';

export default function SignIn({ navigation }) {

	const tokens = useSelector(state => state.token);
	const dispatch = useDispatch();

	const discovery = {
		authorizationEndpoint: 'https://accounts.spotify.com/authorize',
		tokenEndpoint: 'https://accounts.spotify.com/api/token',
	};
	const CLIENT_ID = "3f260525a6374905ab85be85aa9b1242"

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
		dispatch(fetchTokens(body))
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
			<Text style={styles.title}>Welcome to BetterWrapped.</Text>
			<Text style={{ color: "white" }}>Token: {tokens.status}</Text>
			<Pressable style={styles.signIn} onPress={getCode}>
				<Text style={styles.buttonText}>Sign in with Spotify</Text>
			</Pressable>
		</View>
	)
}
