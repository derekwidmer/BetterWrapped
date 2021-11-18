import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'

export default function SignIn(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to BetterWrapped.</Text>
			{/* <Text style={{ color: "white" }}>code: {props.response ? props.response.params.code : " "}</Text> */}
			<Pressable style={styles.signIn} onPress={props.onPress}>
				<Text style={styles.buttonText}>Sign in with Spotify</Text>
			</Pressable>
		</View>
	)
}
