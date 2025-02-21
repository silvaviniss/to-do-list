import PropTypes from 'prop-types';
import api from '../services/api';

function Task({ task, getTasks }) {
	const done = async () => {
		try {
			await api.put(`/tasks/${task.id}`, { ...task, status: false });
			getTasks();
		} catch (error) {
			console.error("Erro ao completar a tarefa:", error);
		}
	};

	const deleteTask = async () => {
		try {
			await api.delete(`/tasks/${task.id}`);
			console.log(`Tarefa com ID ${task.id} deletada.`);
			getTasks();
		} catch (error) {
			console.error("Erro ao deletar a tarefa:", error);
		}
	};

	return (
		<div className="to-do" key={task.id}>
			<div className="contet">
				<p style={{ textDecoration: task.status ? "none" : "line-through" }}>
					{task.title}  ({task.category})
				</p>
			</div>

			<div>
				{
					task.status &&
					<button
						className="complete-button"
						onClick={done}
					>
						Completar
					</button>
				}
				<button className="delete-button" onClick={deleteTask}>Deletar</button>
			</div>
		</div>
	)
}

Task.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		category: PropTypes.string,
		status: PropTypes.bool.isRequired,
	}),
	getTasks: PropTypes.func.isRequired,
};

export default Task;