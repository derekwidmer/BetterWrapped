import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveAsyncStorage(key, value) {
	await AsyncStorage.setItem(key, value);
}

export const fetchUserData = createAsyncThunk(
	'userData/fetchUserData',
	async (token, thunkAPI) => {
		try {
			const userData = await AsyncStorage.getItem('userData');
			if (userData) {
				console.log('Returning userData from storage...');
				return (JSON.parse(userData));
			}
		}
		catch (e) {
			console.log('Error fetching userData from asyncStorage:', e)
		}
		return axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
			.then(res => {
				console.log('Fetched user data')
				return (res.data)
			})
			.catch(e => console.log('Error:', e))
	}
)

const userDataSlice = createSlice({
	name: 'userData',
	initialState: {
		display_name: "",
		external_urls: { spotify: null },
		followers: {
			href: null,
			total: 0,
		},
		href: "",
		id: "",
		images: [
			{
				"height": null,
				"url": "",
				"width": null,
			},
		],
		type: "user",
		uri: "",
		status: "idle"
	},
	reducers: {
		setUserData(state, { payload }) {
			saveAsyncStorage('userData', JSON.stringify(payload));
			state.display_name = payload.display_name
			state.external_urls = payload.external_urls
			state.followers = payload.followers
			state.href = payload.href
			state.id = payload.id
			state.images = payload.images
			state.type = payload.type
			state.uri = payload.uri
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUserData.pending, (state, action) => {
			state.status = "loading"
		})
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.status = "failed"
		})
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.status = "success"
			userDataSlice.caseReducers.setUserData(state, action)
		})
	}
})

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;