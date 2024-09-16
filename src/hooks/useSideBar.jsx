import { useState } from "react";

const useSidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [isSidebarOpenForAnimation, setSidebarOpenForAnimation] =
		useState(false);

	const openSidebar = () => {
		// if(isSidebarOpen){

		// }
		setSidebarOpen(true);
		setSidebarOpenForAnimation(true);
	};

	const closeSidebar = () => {
		setTimeout(() => setSidebarOpen(false), 700);
		setSidebarOpenForAnimation(false);
	};

	return {
		isSidebarOpen,
		isSidebarOpenForAnimation,
		openSidebar,
		closeSidebar,
	};
};

export default useSidebar;
