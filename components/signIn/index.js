import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'

export default function SignIn() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to BetterWrapped.</Text>
			<Pressable style={styles.signIn}>
				<Text style={styles.buttonText}>Sign in with Spotify</Text>
			</Pressable>
		</View>
	)
}
