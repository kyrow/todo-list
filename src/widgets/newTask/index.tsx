import { useState } from 'react'
import NewTaskFeature from '../../features/newTask'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { usePostTodosMutation } from '../../shared/store/task/todoApi'

function NewTaskWidget() {

	const { container, button, buttonsContainer, sendBtn } = styles
	const { completedTasks } = useSelector((state: RootState) => state.tasks)
	const [isNewTaskActive, setNewTaskActive] = useState(false)

	const [sendCompletedTasks] = usePostTodosMutation();

	const handleSendCompletedTasks = async (completedList: string[]) => {
		try {
			const result = await sendCompletedTasks(completedList).unwrap();
			console.log('Success:', result);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className={container}>

			<div className={buttonsContainer}>
				<button
					className={button}
					onClick={() => setNewTaskActive(!isNewTaskActive)}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>

				<button
					onClick={() => handleSendCompletedTasks(completedTasks)}
					className={sendBtn}
				>Send Completed</button>

			</div>

			{isNewTaskActive && <NewTaskFeature />}
		</div>
	)
}

export default NewTaskWidget
