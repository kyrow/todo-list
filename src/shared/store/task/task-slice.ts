import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFilterStatus, ITaskState } from "./ITaskState";
import { getTodos } from "./getTodos";


const initialState: ITaskState = {
	todos: [],
	singleTodo: {
		id: '',
		title: '',
		description: '',
		completed: 0
	},
	completedTasks: [],
	onlyCreated: 0,
	onlyInProgress: null,
	onlyCompleted: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.todos.push(action.payload)
		},


		changeStatus: (state, action: PayloadAction<{ id: string; status: number }>) => {
			const { id, status } = action.payload;
			const taskToUpdate = state.todos.find((task) => task.id === id);

			if (taskToUpdate) {
				taskToUpdate.completed = status;

				if (status === 0 || status === 1) {
					state.completedTasks = state.completedTasks.filter((title) => title !== taskToUpdate.title);
				} else {
					state.completedTasks.push(taskToUpdate.title);
				}
			}
		},


		getTask: (state, action) => {
			const task = action.payload;

			if (task) {
				state.singleTodo = task;
			}
		},

		filterStatuses: (state, action: PayloadAction<IFilterStatus>) => {
			state.onlyCreated = action.payload.onlyCreated
			state.onlyInProgress = action.payload.onlyProgress
			state.onlyCompleted = action.payload.onlyCompleted
		},

	},

	extraReducers: (builder) => {
		builder.addCase(getTodos.pending, () => {

		});
		builder.addCase(getTodos.fulfilled, (state, action) => {
			state.todos = action.payload
		});
		builder.addCase(getTodos.rejected, () => {

		});
	},
})


export const { changeStatus, addTask, getTask, filterStatuses } = authSlice.actions
export default authSlice.reducer