import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import PrivateRoute from "./pages/PrivateRoute";
import ProjectArena from "./pages/ProjectArena";
import WorkSpace from "./components/structured/WorkSpace";
import Discover from "./pages/Discover";
import "./editor.css";
import ModalManager from "./components/structured/modals/ModalManager";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/workspace" element={<WorkSpace />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/explore" element={<Discover />} />
					<Route
						path="/workspace/:projectId"
						element={<ProjectArena />}
					/>
				</Route>
			</Routes>
			<ModalManager />
			<ToastContainer />
		</>
	);
}

export default App;
