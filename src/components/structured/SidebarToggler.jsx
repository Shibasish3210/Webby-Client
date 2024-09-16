import useSidebar from "../../hooks/useSideBar";
import Sidebar from "./Sidebar";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

const SidebarToggler = () => {
	const {
		isSidebarOpen,
		isSidebarOpenForAnimation,
		closeSidebar,
		openSidebar,
	} = useSidebar();
	return (
		<>
			{!isSidebarOpen ? (
				<RiMenuFoldFill
					onClick={openSidebar}
					className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"
				/>
			) : (
				<RiMenuUnfoldFill
					onClick={closeSidebar}
					className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"
				/>
			)}
			{isSidebarOpen && (
				<Sidebar isSidebarOpen={isSidebarOpenForAnimation} />
			)}
		</>
	);
};

export default SidebarToggler;
