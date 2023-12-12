import { useState } from 'react'
import { RootState } from '../../shared/store/store'
import { useDispatch, useSelector } from 'react-redux'
import TaskToggler from '../../features/taskToggler'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { changeStatus, getTask } from '../../shared/store/task/task-slice'

interface ISingleTask {
	id: string
	title: string,
	description: string,
	status: number,
	number: number
}


const SingleTask: React.FC<ISingleTask> = ({ id, title, description, status, number }) => {

	const { taskContainer, reverseIcon, defaultIcon } = styles
	const [isStatusOpen, setStatusOpen] = useState(false)
	const dispatch = useDispatch()
	const statusName = ['Created', 'In Progress', 'Completed']

	return (
		<div className={taskContainer} onClick={() => dispatch(getTask(id))}>

			<span>{number + 1}</span>

			<div>
				<span>{title}</span>
				<span>{description}</span>
			</div>

			<button onClick={() => setStatusOpen(!isStatusOpen)}>
				<span>{statusName[status]}</span>

				<FontAwesomeIcon
					icon={faArrowDown}
					className={!isStatusOpen ? defaultIcon : reverseIcon}
				/>

				{isStatusOpen &&
					<ul>
						<li onClick={() => dispatch(changeStatus({ id, status: 0 }))}>created</li>
						<li onClick={() => dispatch(changeStatus({ id, status: 1 }))}>in progress</li>
						<li onClick={() => dispatch(changeStatus({ id, status: 2 }))}>finished</li>
					</ul>}

			</button>
		</div>
	)
}

function TaskListWidget() {

	const tasks = useSelector((state: RootState) => state.tasks.todos)
	const {
		onlyCreated,
		onlyInProgress,
		onlyCompleted } = useSelector((state: RootState) => state.tasks)
	const { container, taskListContainer } = styles

	const filterBy = (status: number) => {
		return tasks
			.filter(task => task.completed === status)
			.map((task, index) => (
				<SingleTask
					id={task.id}
					title={task.title}
					description={task.description}
					status={task.completed}
					number={index}
					key={index}
				/>
			))
	}

	return (
		<div className={container}>

			<TaskToggler />

			<div className={taskListContainer}>
				{
					tasks ? (
						onlyCreated === 0 ? (
							filterBy(onlyCreated)
						) : onlyInProgress === 1 ? (
							filterBy(onlyInProgress)
						) : onlyCompleted === 2 ? (
							filterBy(onlyCompleted)
						) : (
							<span>No task yet</span>
						)
					) : (
						<span>No task yet</span>
					)
				}

			</div>
		</div>
	)
}

export default TaskListWidget