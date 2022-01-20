import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
import userDataReducer from './userDataSlice'

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		user: userDataReducer
	}
})

