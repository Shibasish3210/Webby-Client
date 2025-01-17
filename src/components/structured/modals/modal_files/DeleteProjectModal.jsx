import { useRef } from "react";
import Input from "../../../shared/Input";
import ModalMaker from "../../../shared/ModalMaker";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../reduxToolkit/slices/modal/modalSlice";
import { deleteProject } from "../../../../reduxToolkit/slices";

const DeleteProjectModal = ({ name, _id }) => {
	const projectName = useRef();
	const dispatch = useDispatch();
	const handleProjectDeletion = async (e) => {
		e.preventDefault();
		if (!projectName.current.value)
			return toast.error("Please enter project name to delete!");
		dispatch(
			deleteProject({ projName: projectName.current.value, name, _id }),
		);
		dispatch(closeModal());
	};
	return (
		<ModalMaker
			modalTitle={`Delete Project`}
			modalDesc={`Please Fill Your Project Name \n ( ${name} )  \n To Delete Project!`}
		>
			{{
				modalInputs: (
					<Input
						id="modal-del-name"
						label="Project Name"
						placeholder="Enter this project name to delete"
						reference={projectName}
						required={true}
					/>
				),
				modalButtons: (
					<button
						type="submit"
						className="Button mt-8"
						onClick={handleProjectDeletion}
					>
						Delete Project
					</button>
				),
			}}
		</ModalMaker>
	);
};

export default DeleteProjectModal;
