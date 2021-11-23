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
		fontSize: 25,
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
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
	profilePicture: {
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: "red"
	},
	username: {
		color: "white",
		fontSize: 25,
		textTransform: "lowercase",
		marginLeft: 10,
		fontWeight: "700"
	},
	divider: {
		borderBottomColor: "white",
		borderBottomWidth: 1,
		marginVertical: 20
	},
	followers: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 30
	},
	followerText: {
		color: "white",
		fontWeight: "500",
		fontSize: 20,
	},
	followerNumber: {
		fontWeight: "700",
		fontSize: 25,
	}
})

export default styles;