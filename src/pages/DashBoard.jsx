import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { RiAddLine } from "react-icons/ri";
import ProjectCards from "../components/shared/ProjectCards";
import { fetchInitialProject, fetchMoreProjects } from "../reduxToolkit/slices";
import SidebarToggler from "../components/structured/SidebarToggler";
import { openModal } from "../reduxToolkit/slices/modal/modalSlice";

const DashBoard = () => {
	const dispatch = useDispatch();
	const projectsData = useSelector((state) => state.projectReducer.projects);
	const totalLength = useSelector(
		(state) => state.projectReducer.totalProjects,
	);

	useEffect(() => {
		dispatch(fetchInitialProject());
	}, [dispatch]);

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

	const openAddProjectModal = () => {
		dispatch(openModal({ modalType: "NEW_PROJECT", modalProps: {} }));
	};

	return (
		<>
			<div className="head flex items-center justify-between px-4 py-2">
				<div className="flex gap-4 justify-center items-center">
					<button
						onClick={() => openAddProjectModal()}
						className="flex gap-2 items-center mt-0 Button"
					>
						<span>Add Project</span>
						<span>
							<RiAddLine />
						</span>
					</button>
				</div>
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
