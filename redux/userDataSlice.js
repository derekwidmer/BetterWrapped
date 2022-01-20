import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const userDataSlice = createSlice({
	name: 'userData',
	initialState: {

	},
	reducers: {
		setUserData(state, payload) {
			
		} 
	}
})


export default userDataSlice.reducer;