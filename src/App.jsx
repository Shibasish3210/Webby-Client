import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from "./pages/DashBoard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import WorkSpace from "./pages/WorkSpace"
import PrivateRoute from "./pages/PrivateRoute";
import ProjectArena from "./pages/ProjectArena";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/demo" element={<WorkSpace/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/workspace/:projectId" element={<ProjectArena/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
