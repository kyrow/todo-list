
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { filterStatuses } from '../../shared/store/task/task-slice'
import { RootState } from '../../shared/store/store'


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
			<label>
				<input
					type='radio'
					onChange={() => handleCheckboxChange(0)}
					checked={onlyCreated === 0 ?? true}
				/>
				Created:
			</label>

			<label>
				<input
					type='radio'
					onChange={() => handleCheckboxChange(1)}
					checked={onlyInProgress === 1 ?? true}
				/>
				In progress:
			</label>

			<label>
				<input
					type='radio'
					onChange={() => handleCheckboxChange(2)}
					checked={onlyCompleted === 2 ?? true}
				/>
				Done: {completedTasks
					.filter(task => task.completed === 2).length}
			</label>
		</div>
	)
}

export default TaskToggler
