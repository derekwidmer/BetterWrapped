import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import styles from './styles'
import StatSection from '../statSection';

export default function HomePage() {
	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.innerContainer}>
				<StatusBar style="light" />
				<Text style={styles.title}>Hi, User</Text>
				<Text style={styles.subtitle}>Stat Views</Text>
				<View style={styles.statViewsContainer}>
					<View style={styles.statView}></View>
					<View style={styles.statView}></View>
				</View>
				<Text style={styles.subtitle}>Explore Your Activity</Text>
				<View style={styles.profileContainer}>
					<View style={styles.profilePicture} />
					<Text style={styles.username}>Username</Text>
				</View>
				<View style={styles.followers}>
					<Text style={styles.followerText}><Text style={styles.followerNumber}>5</Text> followers</Text>
					<Text style={styles.followerText}><Text style={styles.followerNumber}>20</Text> following</Text>
				</View>
				<View style={styles.divider} />
				<StatSection statNum={40} statDesc={"Hours spent listening this month"} />
				<View style={styles.divider} />
				<StatSection statNum={10} statDesc={"Hours spent listening to Bad Bunny this week"} />
			</SafeAreaView>
		</View>
	)
}
