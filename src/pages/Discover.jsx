import { useEffect, useState } from "react";
import SearchBar from "../components/structured/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import ProjectCards from "../components/shared/ProjectCards";
import { fetchMoreProjects, fetchPublicProjects } from "../reduxToolkit/slices";
import SidebarToggler from "../components/structured/SidebarToggler";

const Discover = () => {
	const projectsData = useSelector((state) => state.projectReducer);
	const { feedProjects: feedProjectsData, totalFeedProjects } = projectsData;
	const [filteredData, setFilteredData] = useState(feedProjectsData);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPublicProjects());
	}, []);

	const fetchMorePublicProjects = async () => {
		dispatch(
			fetchMoreProjects({
				skipCount: feedProjectsData.length,
				type: "feed",
			}),
		);
	};

	return (
		<>
			<div className="flex justify-between px-4 py-2">
				<SearchBar
					feedProjectsData={feedProjectsData}
					setFilteredData={setFilteredData}
				/>
				<SidebarToggler />
			</div>
			<main>
				<div
					id="scrollableDiv"
					className="work-container m-auto w-[90vw] h-[90vh] p-6 scroll-smooth"
				>
					{filteredData && (
						<InfiniteScroll
							dataLength={feedProjectsData.length}
							next={fetchMorePublicProjects}
							height={"85vh"}
							hasMore={
								totalFeedProjects > feedProjectsData.length
							}
							loader={<h4>Loading...</h4>}
							scrollableTarget="scrollableDiv"
						>
							{filteredData.length > 0 &&
								filteredData.map((project) => {
									return (
										<ProjectCards
											key={project?._id}
											project={project}
										/>
									);
								})}
						</InfiniteScroll>
					)}
				</div>
			</main>
		</>
	);
};

export default Discover;
