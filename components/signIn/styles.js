import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: '#111',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 45,
		fontWeight: "700",
		color: "#fff",
		paddingBottom: 50
	},
	signIn: {
		backgroundColor: "#1db954",
		borderRadius: 20,
		color: "#fff",
		paddingVertical: 15,
		width: '90%',
		alignItems: 'center',
		position: 'absolute',
		bottom: 50
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '600'
	}
})

export default styles;