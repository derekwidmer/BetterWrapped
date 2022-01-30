import React from 'react';
import styles from './widgetStyles';
import { Text, View } from 'react-native';

export default function ArtistWidget() {
	return (
		<View style={styles.artistWidget}>
			<Text style={styles.artistName}>Test</Text>
		</View>
	);
}
