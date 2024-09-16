import { useRef, useState } from "react";
import Input from "../shared/Input";

const AddProjectModal = ({ exeFunc, modalCloser }) => {
	const [isPublished, setIsPublished] = useState(true);
	const projectName = useRef();
	const projectDesc = useRef();

	const handlePublicState = (e) => {
		const id = e.target.id;
		if (!id) return;
		else if (id === "public" && e.target.checked) setIsPublished(true);
		else if (id === "private" && e.target.checked) setIsPublished(false);
	};
	return (
		<div className="fixed w-screen h-screen z-40 bg-[#383656f2] p-0 m-0">
			<form className="z-50 ">
				<h1 className="text-green-400 mb-6">
					Please Fill Details To Create Project!
				</h1>
				<div className="inputFields">
					<Input
						id="modal-proj-name"
						label="Project Name :"
						placeholder="Enter your project name"
						refrence={projectName}
					/>
					<Input
						id="modal-proj-desc"
						label="Project Description :"
						placeholder="Enter your project description"
						refrence={projectDesc}
					/>
					<div className="flex mt-2  w-full items-center justify-between">
						<div className="w-4/12">
							<p>Project Visibility :</p>
						</div>
						<div className="flex gap-4 w-8/12 pl-3">
							<div className="flex gap-2">
								<input
									className="hover:scale-125 accent-green-300"
									type="radio"
									name="visibility"
									id="public"
									value="Public"
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
									onChange={(e) => handlePublicState(e)}
								/>
								<label htmlFor="private">Private</label>
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="Button mt-32"
					onClick={(e) =>
						exeFunc(e, projectName, projectDesc, isPublished)
					}
				>
					Add Project
				</button>
				<button
					className="Button mt-8"
					onClick={() => modalCloser(false)}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default AddProjectModal;
