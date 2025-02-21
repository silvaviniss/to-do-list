import { useState } from "react";
import api from "../services/api";
import PropTypes from "prop-types";
import Notification from "./Notification";

function RegisterTask({ getTasks }) {
	const [task, setTask] = useState({
		title: "",
		category: "",
		status: true
	});

	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [feedbackType, setFeedbackType] = useState("");

	const register = async (event) => {
		event.preventDefault();
		try {
			await api.post("/tasks", task);
			getTasks();
			setTask({ title: "", category: "", status: false });
			setFeedbackMessage("Tarefa criada com sucesso!");
			setFeedbackType("success");
		} catch (error) {
			console.error("Erro ao cadastrar a tarefa:", error);
			setFeedbackMessage("Erro ao criar tarefa. Tente novamente!");
			setFeedbackType("error");
		}
	};

	return (
		<div className="register">
			<h2>Criar Tarefa</h2>

			<form onSubmit={register}>
				<input
					type="text"
					placeholder="Digite o título"
					value={task.title}
					onChange={(e) => setTask({ ...task, title: e.target.value })}
					required
				/>

				<input
					type="text"
					placeholder="Digite uma categoria"
					value={task.category}
					onChange={(e) => setTask({ ...task, category: e.target.value })}
					required
				/>

				<button type="submit" className="register-button">Criar Tarefa</button>
			</form>

			<Notification
				message={feedbackMessage}
				type={feedbackType}
				onClose={() => setFeedbackMessage("")}
			/>
		</div>
	);
}

RegisterTask.propTypes = {
	getTasks: PropTypes.func
};

export default RegisterTask;