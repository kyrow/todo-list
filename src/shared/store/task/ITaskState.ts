export interface ITask {
	id: string,
	title: string,
	description: string,
	completed: number
}

export interface ITaskState {
	todos: ITask[],
	singleTodo: ITask,
	onlyCreated?: null | number,
	onlyInProgress?: null | number,
	onlyCompleted?: null | number,
	completedTasks: string[]
}

export interface IFilterStatus {
	onlyCreated?: null | number,
	onlyProgress?: null | number,
	onlyCompleted?: null | number,
}