import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import styles from './styles'
import StatSection from '../statSection';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/userDataSlice'

export default function HomePage() {

	const tokens = useSelector(state => state.token)
	const userData = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUserData(tokens.access_token))
	}, [])

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
						{/* <Text style={styles.subtitle}>Stat Views</Text> */}
						{/* <View style={styles.statViewsContainer}>
					<View style={styles.statView}></View>
					<View style={styles.statView}></View>
				</View> */}
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
						{/* <View style={styles.followers}>
					<Text style={styles.followerText}><Text style={styles.followerNumber}>{userData.followers.total}</Text> followers</Text>
				</View> */}
						<View style={styles.divider} />
						<StatSection statNum={40} statDesc={"Hours spent listening this month"} />
						<View style={styles.divider} />
						<StatSection statNum={10} statDesc={"Hours spent listening to Bad Bunny this week"} />
					</SafeAreaView>
				</View>
			}
		</>
	)
}
