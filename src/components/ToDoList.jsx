import { useEffect, useState, useCallback } from "react";
import Task from "./Task";
import RegisterTask from "./RegisterTask";
import api from "../services/api";

function ToDoList() {
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState("all");

	const getTasks = useCallback(async () => {
		try {
			const res = await api.get('/tasks');
			setTasks(res.data);
		} catch (error) {
			console.error("Erro ao buscar tarefas:", error);
		}
	}, []);

	useEffect(() => {
		getTasks();
	}, [getTasks]);


	const filteredTasks = tasks.filter(task => {
		if (filter === "completed") {
			return task.status === false;
		}
		if (filter === "pending") {
			return task.status === true;
		}
		return true;
	});

	return (
		<div className="to-do-list">
			<h1>Lista de Tarefas</h1>

			<div className="filter-buttons">
				<button onClick={() => setFilter("all")}>Todas</button>
				<button onClick={() => setFilter("pending")}>A Fazer</button>
				<button onClick={() => setFilter("completed")}>Completas</button>
			</div>

			<div className="list">
				{filteredTasks.length > 0 ? (
					filteredTasks.map(toDo => <Task key={toDo.id} task={toDo} getTasks={getTasks} />)
				) : (
					<p>Nenhuma tarefa encontrada.</p>
				)}
			</div>

			<RegisterTask getTasks={getTasks} />
		</div>
	);
}

export default ToDoList;