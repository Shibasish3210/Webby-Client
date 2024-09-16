import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WorkSpace from "../components/structured/WorkSpace";
import Button from "../components/shared/Button";
import {
	addCurrProject,
	getCurrentProject,
	updateCurrentProject,
} from "../reduxToolkit/slices";

const ProjectArena = () => {
	const { projectId } = useParams();
	const currProjData = useSelector(
		(state) => state.projectReducer.currProject,
	);

	const [htmlText, setHtmlText] = useState("");
	const [cssText, setCssText] = useState("");
	const [jsText, setJsText] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const storedProject = JSON.parse(localStorage.getItem("currProject"));
		if (!storedProject) {
			dispatch(getCurrentProject(projectId));
		} else if (storedProject._id === projectId) {
			dispatch(addCurrProject(storedProject));
		} else {
			dispatch(getCurrentProject(projectId));
		}

		const preventDefault = (e) => {
			console.log(e);
			e.preventDefault();
		};
		window.addEventListener("beforeunload", () => {
			preventDefault();
		});

		return () => {
			window.removeEventListener("beforeunload", () => {
				preventDefault();
			});
		};
	}, [projectId]);

	useEffect(() => {
		setHtmlText(currProjData?.html);
		setCssText(currProjData?.css);
		setJsText(currProjData?.js);
	}, [currProjData]);

	const updateData = () => {
		dispatch(updateCurrentProject({ currProjData }));
	};

	const handleExit = () => {
		const progress = confirm(
			"Please make sure you have saved your changes",
		);
		if (!progress) return;
		navigate(-2);
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
