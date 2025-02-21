import { useEffect } from "react";
import PropTypes from "prop-types";

function Notification({ message, type, onClose }) {
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				onClose();
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [message, onClose]);

	if (!message) return null;

	return (
		<div className={type === "error" ? "error-message" : "success-message"}>
			{message}
		</div>
	);
}

Notification.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(["success", "error"]),
	onClose: PropTypes.func.isRequired,
};

export default Notification;