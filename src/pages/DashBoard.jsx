import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { RiAddLine } from "react-icons/ri";
import ProjectCards from "../components/shared/ProjectCards";
import AddProjectModal from "../components/structured/AddProjectModal";
import {
	createProject,
	fetchInitialProject,
	fetchMoreProjects,
} from "../reduxToolkit/slices";
import SidebarToggler from "../components/structured/SidebarToggler";

const DashBoard = () => {
	const dispatch = useDispatch();
	const projectsData = useSelector((state) => state.projectReducer.projects);
	const totalLength = useSelector(
		(state) => state.projectReducer.totalProjects,
	);
	const [addProject, setAddProject] = useState(false);

	useEffect(() => {
		dispatch(fetchInitialProject());
	}, [dispatch]);

	const handleProjectCreation = async (
		e,
		projName,
		projDetails,
		visibility,
	) => {
		e.preventDefault();
		dispatch(createProject({ projName, projDetails, visibility }));
		setAddProject(false);
	};

	const fetchMoreSelfProjects = async () => {
		dispatch(
			fetchMoreProjects(
				fetchMoreProjects({
					skipCount: projectsData.length,
					type: "selfFeed",
				}),
			),
		);
	};

	return (
		<>
			<div className="head flex items-center justify-between px-4 py-2">
				<div className="flex gap-4 justify-center items-center">
					<button
						onClick={() => setAddProject(true)}
						className="flex gap-2 items-center mt-0 Button"
					>
						<span>Add Project</span>
						<span>
							<RiAddLine />
						</span>
					</button>
				</div>
				{addProject && (
					<div className="absolute top-0 left-0">
						<AddProjectModal
							exeFunc={handleProjectCreation}
							modalCloser={setAddProject}
						/>
					</div>
				)}
				<SidebarToggler />
			</div>
			<h1 className="text-2xl p-4">Recent Works</h1>
			<div
				id="scrollableDiv"
				className="work-container m-auto w-[90vw] h-[90vh] p-6 scroll-smooth"
			>
				<InfiniteScroll
					dataLength={projectsData.length}
					next={fetchMoreSelfProjects}
					height={"85vh"}
					hasMore={totalLength > projectsData.length}
					loader={<h4>Loading...</h4>}
					scrollableTarget="scrollableDiv"
				>
					{projectsData.length > 0 &&
						projectsData.map((project) => {
							return (
								<ProjectCards
									key={project?._id}
									project={project}
								/>
							);
						})}
				</InfiniteScroll>
			</div>
		</>
	);
};

export default DashBoard;
