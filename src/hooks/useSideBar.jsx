import { useState } from "react";

const useSidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarOpenForAnimation, setIsSidebarOpenForAnimation] =
		useState(false);

	const openSidebar = () => {
		setIsSidebarOpen(true);
		setIsSidebarOpenForAnimation(true);
	};

	const closeSidebar = () => {
		setTimeout(() => setIsSidebarOpen(false), 700);
		setIsSidebarOpenForAnimation(false);
	};

	return {
		isSidebarOpen,
		isSidebarOpenForAnimation,
		openSidebar,
		closeSidebar,
	};
};

export default useSidebar;
