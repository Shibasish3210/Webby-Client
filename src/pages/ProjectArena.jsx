import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import callApi from "../config/api";
import { removeCurrProject } from "../reduxToolkit/slices/projectSlice";
import WorkSpace from "../components/structured/WorkSpace";
import Button from "../components/shared/Button";

const ProjectArena = () => {
	const { projectId } = useParams();
	const currProjData = useSelector(
		(state) => state.projectReducer.currProject
	);

	const [htmlText, setHtmlText] = useState("");
	const [cssText, setCssText] = useState("");
	const [jsText, setJsText] = useState("");

	useEffect(() => {
		const fetchCurrProject = async () => {
			const response = await callApi.get(`/project/${projectId}`, {
				headers: {
					userToken: `${Cookies.get("USER_TOKEN") || ""}`,
				},
			});

			if (response.data.status === 200) {
				console.log(response.data);
				setHtmlText(response.data.data.html);
				setCssText(response.data.data.css);
				setJsText(response.data.data.js);
			} else {
				toast.error(response.data.message);
			}
		};

		fetchCurrProject();
		window.addEventListener("beforeunload", (e) => {
			console.log(e);
			e.preventDefault();
		});
	}, [projectId]);

	const updateData = async () => {
		const { projectId, html, css, js } = currProjData;
		const response = await callApi.patch(
			"/project/update",
			{
				projectId,
				html,
				css,
				js,
			},
			{
				headers: {
					userToken: `${Cookies.get("USER_TOKEN") || ""}`,
				},
			}
		);

		const data = response.data;

		if (data.status !== 200) {
			toast.error(data.message);
			return;
		}
		toast.success(data.message);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleExit = () => {
		const progress = confirm(
			"Please make sure you have saved your changes"
		);
		if (!progress) return;
		dispatch(removeCurrProject());
		navigate("/dashboard");
	};
	return (
		<div className="h-[100vh] overflow-hidden">
			<div className="flex gap-8 justify-end px-4 py-2">
				<Button func={updateData} value={"Save"} />
				<Button func={handleExit} value={"Exit"} />
			</div>
			<WorkSpace
				projectId={projectId}
				htmlText={htmlText}
				cssText={cssText}
				jsText={jsText}
			/>
		</div>
	);
};

export default ProjectArena;
