import { useSelector } from "react-redux";
import AccountDeletionModal from "./modal_files/AccountDeletionModal";
import AddProjectModal from "./modal_files/AddProjectModal";
import DeleteProjectModal from "./modal_files/DeleteProjectModal";

const ModalManager = () => {
	const { isOpen, modalType, modalProps } = useSelector(
		(state) => state.modalReducer,
	);

	if (!isOpen) {
		return null;
	}

	const renderModalContent = () => {
		switch (modalType) {
			case "ACCOUNT_DELETE":
				return <AccountDeletionModal {...modalProps} />;
			case "PROJECT_DELETE":
				return <DeleteProjectModal {...modalProps} />;
			case "NEW_PROJECT":
				return <AddProjectModal {...modalProps} />;
			case "SAVE_AS":
				return <SaveAsModal {...modalProps} />;
			default:
				return null;
		}
	};

	return (
		<div className="modal">
			<div className="modal-content">{renderModalContent()}</div>
		</div>
	);
};

export default ModalManager;
