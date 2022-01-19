import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchTokens = createAsyncThunk(
	'tokens/fetchTokens',
	async (body, thunkAPI) => {
		return axios.get('http://localhost:5001/betterwrapped/us-central1/app/getTokens', { params: body })
			.then(res => {
				console.log('Res.data:', res.data)
				return res.data
			})
			.catch(e => console.log('Error:\n', e))
	}
);

const tokenSlice = createSlice({
	name: 'token',
	initialState: {
		access_token: null,
		token_type: null,
		expires_at: null,
		refresh_token: null,
		status: 'idle'
	},
	reducers: {
		setTokens(state, payload) {
			console.log("Action object", payload)
			state.access_token = payload.access_token
			state.refresh_token = payload.refresh_token
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTokens.pending, (state, action) => {
			state.status = 'loading'
		})
		builder.addCase(fetchTokens.fulfilled, (state, action) => {
			state.status = 'success'
			tokenSlice.caseReducers.setTokens(state, action.payload)
		})
		builder.addCase(fetchTokens.rejected, (state, action) => {
			state.status = 'failed'
			console.log('Error:', action.error)
		})
	},
})

export default tokenSlice.reducer;