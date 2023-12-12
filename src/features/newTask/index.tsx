
import styles from './index.module.scss'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { addTask } from '../../shared/store/task/task-slice'
import { nanoid } from 'nanoid'

type Inputs = {
	title: string
	description: string
}

function NewTaskFeature() {

	const { container, form, button } = styles
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(addTask({
			id: nanoid(),
			title: data.title,
			description: data.description,
			completed: 0
		}))
	}

	return (
		<div className={container}>
			<span>Let's add a new task</span>

			<form onSubmit={handleSubmit(onSubmit)} className={form}>
				<label>Title</label>
				<input
					{...register("title", { required: true, maxLength: 30 })} />

				<label>Description</label>
				<input {...register("description")} />

				{errors.title && <span>This field is required</span>}

				<input type="submit" className={button} value='Create a task' />
			</form>

		</div>
	)
}

export default NewTaskFeature
