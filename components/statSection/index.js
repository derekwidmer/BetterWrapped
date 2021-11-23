import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function StatSection(props) {
	return (
		<View style={styles.statSection}>
			<View style={{ flex: 1 }}>
				<Text style={styles.statNum}>{props.statNum}</Text>
			</View>
			<View style={{ flex: 3 }}>
				<Text style={styles.statDesc}>{props.statDesc}</Text>
			</View>
		</View>
	)
}
