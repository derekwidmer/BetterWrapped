import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export const fetchTokens = createAsyncThunk(
	'tokens/fetchTokens',
	async (body) => {
		try {
			const refresh_token = await SecureStore.getItemAsync('refresh_token')
			console.log('Refresh token fetched from SecureStore...')
			if (refresh_token) {
				return axios.get('http://localhost:5001/betterwrapped/us-central1/app/getRefreshedTokens', { params: { refresh_token } })
					.then(res => {
						console.log('Fetching tokens....')
						return res.data;
					})
					.catch(e => console.log('Error Refreshing Token:\n', e))
			}
		} catch (e) {
			console.log('Error fetching refresh_token from SecureStore:', e)
		}
		return axios.get('http://localhost:5001/betterwrapped/us-central1/app/getTokens', { params: body })
			.then(res => {
				return res.data
			})
			.catch(e => console.log('Error getting inital tokens:\n', e))
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
			state.access_token = payload.access_token
			state.refresh_token = payload.refresh_token
			save('refresh_token', payload.refresh_token)
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