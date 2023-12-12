
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { filterStatuses } from '../../shared/store/task/task-slice'
import { RootState } from '../../shared/store/store'


interface ISingleToggle {
	progressStatus?: number | null
	title: string
	activeNumber: number
	changeStatus: (statusNumber: number) => void
}

const SingleToggle: React.FC<ISingleToggle> = ({ progressStatus, title, activeNumber, changeStatus }) => {

	const { toggleContainer, toggleWrapper, enable, disable } = styles

	return (
		<div className={toggleWrapper}>
			<span>{title}</span>
			<div className={toggleContainer}>
				<span
					className={progressStatus === activeNumber ? enable : disable}
					onClick={() => changeStatus(activeNumber)}
				></span>
			</div>
		</div>
	)
}


function TaskToggler() {

	const { container } = styles
	const dispatch = useDispatch()

	const { onlyCreated,
		onlyInProgress,
		onlyCompleted } = useSelector((state: RootState) => state.tasks)

	const completedTasks = useSelector((state: RootState) => state.tasks.todos)

	const handleCheckboxChange = (statusValue: number | null) => {
		dispatch(
			filterStatuses({
				onlyCreated: statusValue === 0 ? 0 : null,
				onlyProgress: statusValue === 1 ? 1 : null,
				onlyCompleted: statusValue === 2 ? 2 : null,
			})
		);
	};

	return (
		<div className={container}>

			<SingleToggle
				progressStatus={onlyCreated}
				title='Created:'
				activeNumber={0}
				changeStatus={handleCheckboxChange}
			/>

			<SingleToggle
				progressStatus={onlyInProgress}
				title='In Progress:'
				activeNumber={1}
				changeStatus={handleCheckboxChange}
			/>

			<SingleToggle
				progressStatus={onlyCompleted}
				title='Completed:'
				activeNumber={2}
				changeStatus={handleCheckboxChange}
			/>

			<span>Completed tasks: 	{completedTasks
				.filter(task => task.completed === 2).length}</span>
		</div>
	)
}

export default TaskToggler
