import React, { useEffect } from 'react'
import { ScrollView, View, Text, SafeAreaView, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/userDataSlice'
import { fetchTokens } from '../../redux/tokenSlice';
import ArtistWidget from './ArtistWidget';

export default function HomePage() {

	const userData = useSelector(state => state.user)
	const tokens = useSelector(state => state.token)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTokens())
	}, [])

	useEffect(() => {
		if (tokens.access_token) {
			dispatch(fetchUserData(tokens.access_token));
		}
	}, [tokens])

	return (
		<>
			{userData.status == "loading" || userData.status == "idle"
				?
				<View style={styles.container}>
					<Text style={styles.title}>Loading...</Text>
				</View>
				:
				<View style={styles.container}>
					<SafeAreaView style={styles.innerContainer}>
						<StatusBar style="light" />
						<Text style={styles.title}>Hi, {userData.display_name}</Text>
						<Text style={styles.subtitle}>Explore Your Activity</Text>
						<View style={styles.profileContainer}>
							<View style={styles.imageBorder}>
								{userData.images[0].url.length > 0 ?
									<Image
										style={styles.profilePicture}
										source={{ uri: userData.images[0].url }}
									/> :
									<></>
								}
							</View>
							<Text style={styles.username}>{userData.id}</Text>
						</View>
						{/* <View style={styles.divider} /> */}
						<Text style={styles.title}>Your Top Artists</Text>
						<ScrollView horizontal style={styles.artists}>
							<ArtistWidget />
							<ArtistWidget />
							<ArtistWidget />
						</ScrollView>
						{/* <View style={styles.divider} /> */}
					</SafeAreaView>
				</View>
			}
		</>
	)
}
