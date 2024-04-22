import { useEffect, useState } from "react";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import Sidebar from "../components/structured/Sidebar";
import SearchBar from "../components/structured/SearchBar";
import callApi from "../config/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import ProjectCards from "../components/shared/ProjectCards";

const Discover = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [length, setLength] = useState(0);
	const projectsData = useSelector((state) => state.projectReducer.projects);

	useEffect(() => {
		const fetchPublicProjects = async () => {
			try {
				const response = await callApi.get("/project/projects", {
					headers: {
						userToken: `${Cookies.get("USER_TOKEN") || ""}`,
					},
				});
				if (response.data.status !== 200) {
					toast.error(response.data.message);
					return;
				}
				// setProjects(response.data);
				// console.log(projects);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		};

		fetchPublicProjects();
	}, []);

	const fetchMoreProjects = async () => {
		const response = await callApi.get(
			`/project?skip=${projectsData.length}`,
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

		dispatch(addProjects([...projectsData, ...data.data.data]));
		setLength(data.data.metadata[0].total);
	};

	return (
		<>
			<div className="flex justify-between px-4 py-2">
				{isSidebarOpen && <Sidebar />}
				<SearchBar />
				{!isSidebarOpen ? (
					<RiMenuFoldFill
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"
					/>
				) : (
					<RiMenuUnfoldFill
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"
					/>
				)}
			</div>
			<main>
				<div
					id="scrollableDiv"
					className="work-container m-auto w-[90vw] h-[90vh] p-6 scroll-smooth"
				>
					<InfiniteScroll
						dataLength={projectsData.length}
						next={fetchMoreProjects}
						height={"85vh"}
						hasMore={length > projectsData.length ? true : false}
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
			</main>
		</>
	);
};

export default Discover;
