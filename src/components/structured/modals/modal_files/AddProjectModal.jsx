import { useRef, useState } from "react";
import Input from "../../../shared/Input";
import ModalMaker from "../../../shared/ModalMaker";
import { createProject } from "../../../../reduxToolkit/slices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../reduxToolkit/slices/modal/modalSlice";

const AddProjectModal = () => {
	const [isPublished, setIsPublished] = useState(true);
	const projectName = useRef();
	const projectDesc = useRef();
	const dispatch = useDispatch();

	const handleProjectCreation = async (e) => {
		e.preventDefault();
		if (!projectName.current.value || !projectDesc.current.value) {
			console.log("empty");
			return toast.error("Please fill all the fields!");
		}

		dispatch(createProject({ projectName, projectDesc, isPublished }));
		dispatch(closeModal());
	};

	const handlePublicState = (e) => {
		const id = e.target.id;
		if (!id) return;
		else if (id === "public" && e.target.checked) setIsPublished(true);
		else if (id === "private" && e.target.checked) setIsPublished(false);
	};
	return (
		<ModalMaker
			modalTitle={"Create New Project"}
			modalDesc={"Please Fill Details To Create Project!"}
			del={false}
		>
			{{
				modalInputs: (
					<>
						<Input
							id="modal-proj-name"
							label="Project Name"
							placeholder="Enter your project name"
							reference={projectName}
							required={true}
						/>
						<Input
							id="modal-proj-desc"
							label="Project Description"
							placeholder="Enter your project description"
							reference={projectDesc}
							required={true}
						/>
						<div className="flex flex-col gap-2 md:flex-row mt-2  w-full md:items-center justify-between relative">
							<span className="text-red-400 absolute right-[-5px] bottom-3">
								*
							</span>
							<div className="min-w-fit">
								<p>Project Visibility :</p>
							</div>
							<div className="flex gap-4 w-8/12 md:justify-end">
								<div className="flex gap-2">
									<input
										className="hover:scale-125 accent-green-300"
										type="radio"
										name="visibility"
										id="public"
										value="Public"
										checked={isPublished}
										onChange={(e) => handlePublicState(e)}
									/>
									<label htmlFor="public">Public</label>
								</div>
								<div className="flex gap-2">
									<input
										className="hover:scale-125  accent-green-300"
										type="radio"
										name="visibility"
										id="private"
										value="Private"
										checked={!isPublished}
										onChange={(e) => handlePublicState(e)}
									/>
									<label htmlFor="private">Private</label>
								</div>
							</div>
						</div>
					</>
				),
				modalButtons: (
					<button
						type="button"
						className="Button mt-8"
						onClick={handleProjectCreation}
					>
						Add Project
					</button>
				),
			}}
		</ModalMaker>
	);
};

export default AddProjectModal;
