import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://test' }),
	endpoints: (build) => ({
		postTodos: build.mutation({
			query: (completedTasks) => ({
				url: 'todos',
				method: 'POST',
				body: { completedTasks }
			}),
		})
	})
})

export const { usePostTodosMutation } = todoApi