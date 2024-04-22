import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { MdOutlineAutoDelete, MdOutlineEdit } from "react-icons/md";
import { deleteProject } from "../../reduxToolkit/slices/projectSlice";
import callApi from "../../config/api";
import DeleteProjectModal from "../structured/DeleteProjectModal";
import { useNavigate } from "react-router-dom";

const initialProj = {
	name: "test",
	createdAt: new Date(),
	html: "<h1>Test</h1>",
	css: "",
	js: "",
};

const ProjectCards = ({ project = initialProj }) => {
	const dispatch = useDispatch();
	const [srcDoc, setSrcDoc] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { name, details, createdAt, html, css, js, _id } = project;

	useEffect(() => {
		setSrcDoc(`
      <html>
      <body>
      ${html ? html : ""}
      <style>${css ? css : ""}</style>
      <script>${js ? js : ""}</script>
      </body>
      </html>
    `);
		console.log(project);
	}, [html, css, js]);

	const navigate = useNavigate();

	const handleProjectDeletion = async (e, projName) => {
		e.preventDefault();

		if (projName !== name) {
			toast.error(`Sorry, project name doesn't match with actual name`);
			return;
		}
		const response = await callApi.delete(`/project/delete/${_id}`, {
			headers: {
				userToken: Cookies.get("USER_TOKEN"),
			},
		});
		if (response.data.status !== 200) {
			toast.error(response.data.message);
			return;
		}
		dispatch(deleteProject(_id));
		toast.success(response.data.message);
	};

	return (
		<>
			<div
				to={`/workspace/${_id}`}
				className="border-2 border-[#c7f9cc] group relative work-cards bg-gradient-to-r via-[#fe812dc9] to-[#22577ad2] from-[#fccb46d2] opacity-80 transition-all  hover:shadow-2xl hover:opacity-100 h-[60vh] w-[95%] m-auto p-2 mt-2 flex gap-2 rounded-2xl mb-8"
			>
				<div className="info flex-grow flex flex-col justify-center gap-8 items-center group-hover:hidden">
					<h3 className="text-4xl">{`Name : ${name && name}`}</h3>
					<p className="text-xl">{`Details : ${
						details && details
					}`}</p>
					<p className="text-xl">{`Created At : ${
						createdAt &&
						Math.floor(
							(Date.now() - createdAt) / 1000 / 60 / 60 / 24
						)
					} days ago`}</p>
				</div>
				<div className="btn-cont absolute right-8 bottom-8 flex flex-col gap-2">
					<button
						className="Button flex gap-2 justify-center"
						onClick={(e) => {
							e.preventDefault();
							setIsModalOpen(true);
						}}
					>
						<span>Delete</span>
						<MdOutlineAutoDelete className="text-2xl " />
					</button>
					<button
						className="Button flex gap-2 justify-center"
						onClick={(e) => {
							e.preventDefault();
							navigate(`/workspace/${_id}`);
						}}
					>
						<span>Edit</span>
						<MdOutlineEdit className="text-2xl " />
					</button>
				</div>
				{
					<iframe
						height={"100%"}
						width={"55%"}
						color="white"
						className="hidden group-hover:block bg-black rounded-xl text-white m-auto"
						srcDoc={srcDoc}
					></iframe>
				}
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
		</>
	);
};

export default ProjectCards;
