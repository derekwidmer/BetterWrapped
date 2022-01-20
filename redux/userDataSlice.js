import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

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
	},
	reducers: {
		setUserData(state, { payload }) {
			state.display_name = payload.display_name
			state.external_urls = payload.external_urls
			state.followers = payload.followers
			state.href = payload.href
			state.id = payload.id
			state.images = payload.images
			state.type = payload.type
			state.uri = payload.uri
		}
	}
})

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;