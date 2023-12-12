import { configureStore } from "@reduxjs/toolkit";
import tasks from './task/task-slice'
import { todoApi } from "./task/todoApi";

export const store = configureStore({
	reducer: {
		tasks,
		[todoApi.reducerPath]: todoApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
	devTools: true
})


export type RootState = ReturnType<typeof store.getState>