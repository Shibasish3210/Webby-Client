import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	MdOutlineAutoDelete,
	MdOutlineEdit,
	MdPreview,
	MdCancelPresentation,
	MdSaveAs,
	MdPublic,
	MdPublicOff,
} from "react-icons/md";
import DeleteProjectModal from "../structured/DeleteProjectModal";
import { useNavigate } from "react-router-dom";
import { addCurrProject, deleteProject } from "../../reduxToolkit/slices";

const initialProj = {
	name: "test",
	details: undefined,
	createdAt: new Date(),
	html: "<h1>Test</h1>",
	css: "",
	js: "",
};

const ProjectCards = ({ project = initialProj }) => {
	const USER_ID = useSelector((state) => state.userReducer.user.userId);
	const [srcDoc, setSrcDoc] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewOpenAnimation, setPreviewOpenAnimation] = useState(false);
	const {
		name,
		details,
		createdAt,
		html,
		css,
		js,
		_id,
		userId,
		isPublished,
	} = project;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setSrcDoc(`
			<html>
			<body>
			${html || ""}
			<style>${css || ""}</style>
			<script>${js || ""}</script>
			</body>
			</html>`);
	}, [html, css, js]);

	const managePreview = (e) => {
		e.preventDefault();
		if (previewOpen) {
			setPreviewOpenAnimation(false);
			setTimeout(() => setPreviewOpen(false), 700);
		} else {
			setPreviewOpen(true);
			setPreviewOpenAnimation(true);
		}
	};

	const handleProjectDeletion = async (e, projName) => {
		e.preventDefault();
		console.log(project);
		dispatch(deleteProject({ projName, name, _id }));
	};

	const handleEdit = async (e, project) => {
		e.preventDefault();
		dispatch(addCurrProject(project));
		localStorage.setItem("currProject", JSON.stringify(project));
		navigate(`/workspace/${_id}`);
	};

	const handleCopiedProjectEdit = async (e, project) => {
		e.preventDefault();
		dispatch(addCurrProject(project));
		localStorage.setItem("currProject", JSON.stringify(project));
		navigate(`/workspace/${_id}`);
	};

	return (
		<>
			<div
				to={`/workspace/${_id}`}
				className="flex flex-col gap-4 lg:flex-row justify-between border-2 border-[#c7f9cc] group relative work-cards opacity-70 transition-all hover:shadow-xl hover:opacity-100 h-fit  m-auto p-2 mt-2 rounded-md mb-8"
			>
				<div className="info flex-grow flex-col  md:flex-row flex md:items-center justify-between w-full lg:w-8/12 gap-2 md:gap-0 px-4">
					<p
						className="text-sm"
						title={`Name : ${name}`}
					>{`${name}`}</p>
					<p className="text-xs">{`Details : ${details || "--"}`}</p>
					<p className="text-xs">{`Created At : ${
						createdAt &&
						Math.floor(
							(Date.now() - createdAt) / 1000 / 60 / 60 / 24,
						)
					} days ago`}</p>
				</div>
				<div className="btn-cont grid grid-cols-2 md:flex items-center gap-2 w-[16rem] md:w-[20rem] m-0 md:m-auto lg:m-0">
					{USER_ID === userId && (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								e.preventDefault();
								setIsModalOpen(true);
							}}
						>
							<MdOutlineAutoDelete className="text-xl" />
							<span className="icon_button_text">Delete</span>
						</button>
					)}
					{USER_ID === userId ? (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleEdit(e, project);
							}}
						>
							<MdOutlineEdit className="text-xl " />
							<span className="icon_button_text">Edit</span>
						</button>
					) : (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleCopiedProjectEdit(e, project);
							}}
						>
							<MdSaveAs className="text-xl " />
							<span className="icon_button_text text-xs">
								Save As
							</span>
						</button>
					)}
					{USER_ID === userId && isPublished ? (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleEdit(e, project);
							}}
						>
							<MdPublic className="text-xl " />
							<span className="icon_button_text">Hide</span>
						</button>
					) : (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleCopiedProjectEdit(e, project);
							}}
						>
							<MdPublicOff className="text-xl " />
							<span className="icon_button_text text-xs">
								Publish
							</span>
						</button>
					)}
					<button
						className="icon_Button  group/button"
						onClick={managePreview}
					>
						{!previewOpenAnimation ? (
							<>
								<MdPreview className="text-xl" />
								<span className="icon_button_text">
									Preview
								</span>
							</>
						) : (
							<>
								<MdCancelPresentation className="text-xl" />
								<span className="icon_button_text">Close</span>
							</>
						)}
					</button>
				</div>
			</div>
			{isModalOpen && (
				<div className="absolute top-0 left-0">
					<DeleteProjectModal
						name={name}
						exeFunc={handleProjectDeletion}
						modalCloser={setIsModalOpen}
					/>
				</div>
			)}
			{previewOpen && (
				<iframe
					height={"70%"}
					width={"55%"}
					color="white"
					className={`bg-[#9d9d9df2] rounded-xl text-white m-auto ${
						previewOpenAnimation ? "animate-grow" : "animate-shrink"
					}`}
					srcDoc={srcDoc}
					title="preview"
				></iframe>
			)}
		</>
	);
};

export default ProjectCards;
