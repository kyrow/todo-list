
import NewTaskWidget from '../../widgets/newTask'
import TaskListWidget from '../../widgets/taskList'
import styles from './index.module.scss'

function MainPage() {

	const { container } = styles

	return (
		<div className={container}>
			<NewTaskWidget />
			<TaskListWidget />
		</div>
	)
}

export default MainPage
