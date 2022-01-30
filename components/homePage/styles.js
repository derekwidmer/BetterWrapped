import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#111',
		height: "100%",
		flex: 1,
		padding: 20
	},
	innerContainer: {

	},
	title: {
		marginTop: 20,
		color: "white",
		fontSize: 38,
		fontWeight: "700",
	},
	subtitle: {
		marginVertical: 20,
		color: "white",
		fontSize: 22,
		fontWeight: "500",
	},
	statViewsContainer: {
		flexDirection: "row",
		marginBottom: 15
	},
	statView: {
		width: 100,
		height: 150,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 10,
		marginRight: 15
	},
	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 10
	},
	profilePicture: {
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: "red"
	},
	imageBorder: {
		backgroundColor: "white",
		padding: 2,
		borderRadius: 100
	},
	username: {
		color: "white",
		fontSize: 25,
		textTransform: "lowercase",
		marginLeft: 15,
		fontWeight: "700"
	},
	divider: {
		borderBottomColor: "white",
		borderBottomWidth: 1,
		marginVertical: 20
	},
	followers: {
		flexDirection: "row",
		// justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 15
	},
	followerText: {
		color: "white",
		fontWeight: "500",
		fontSize: 17,
	},
	followerNumber: {
		fontWeight: "700",
		fontSize: 17,
	},
	artists: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 15
	}
})

export default styles;