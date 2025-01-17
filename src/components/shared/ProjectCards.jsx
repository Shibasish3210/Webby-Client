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
import { useNavigate } from "react-router-dom";
import { addCurrProject } from "../../reduxToolkit/slices";
import { openModal } from "../../reduxToolkit/slices/modal/modalSlice";

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

	const openProjectDeletionModal = () => {
		dispatch(
			openModal({
				modalType: "PROJECT_DELETE",
				modalProps: { name, _id },
			}),
		);
	};

	return (
		<>
			<div
				to={`/workspace/${_id}`}
				className="flex flex-col gap-4 lg:flex-row justify-between border-2 border-[#c7f9cc] group relative work-cards opacity-70 transition-all hover:shadow-xl group hover:opacity-100 h-[30vh] w-[30vw] m-auto p-2 mt-2 rounded-md mb-8"
			>
				<div className="info group-hover:opacity-0 group-hover:translate-y-8 transition-all duration-400 flex-grow flex-col flex md:items-center justify-between w-full lg:w-8/12 gap-2 md:gap-0 px-4">
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
				{/* md:flex */}
				<div className="opacity-0  btn-cont group-hover:-translate-y-8 transition-all duration-300 delay-300 group-hover:opacity-100 grid grid-cols-2  items-center gap-2  m-0 md:m-auto lg:m-0">
					{USER_ID === userId && (
						<button
							className="icon_Button group/button"
							type="button"
							onClick={openProjectDeletionModal}
						>
							<MdOutlineAutoDelete className="text-sm md:text-xl" />
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
							<MdOutlineEdit className="text-sm md:text-xl " />
							<span className="icon_button_text">Edit</span>
						</button>
					) : (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleCopiedProjectEdit(e, project);
							}}
						>
							<MdSaveAs className="text-sm md:text-xl" />
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
							<MdPublic className="text-sm md:text-xl" />
							<span className="icon_button_text">Hide</span>
						</button>
					) : (
						<button
							className="icon_Button group/button"
							onClick={(e) => {
								handleCopiedProjectEdit(e, project);
							}}
						>
							<MdPublicOff className="text-sm md:text-xl" />
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
								<MdPreview className="text-sm md:text-xl" />
								<span className="icon_button_text">
									Preview
								</span>
							</>
						) : (
							<>
								<MdCancelPresentation className="text-sm md:text-xl" />
								<span className="icon_button_text">Close</span>
							</>
						)}
					</button>
				</div>
			</div>
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
