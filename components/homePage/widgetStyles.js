import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	artistWidget: {
		height: 150,
		width: 150,
		backgroundColor: 'white',
		borderRadius: 15,
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		padding: 10,
		marginRight: 15
	},
	artistName: {
		fontSize: 20,
		fontWeight: "bold",
		textTransform: 'uppercase',
	}
});

export default styles;