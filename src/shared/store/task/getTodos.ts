import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/http";

export const getTodos = createAsyncThunk(
	'user/getTodos',

	async () => {
		try {
			const response = await api.get(
				`/todos/`,
			)

			return response.data.data
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catch (error: any) {
			console.warn(error)
		}
	}

)