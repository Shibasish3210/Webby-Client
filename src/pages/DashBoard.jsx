import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { RiMenuFoldFill, RiMenuUnfoldFill, RiAddLine } from "react-icons/ri";
import callApi from "../config/api";
import { addProjects } from "../reduxToolkit/slices/projectSlice";
import ProjectCards from "../components/shared/ProjectCards";
import Sidebar from "../components/structured/Sidebar";
import AddProjectModal from "../components/structured/AddProjectModal";



const DashBoard = () => {
  const dispatch = useDispatch();
  const projectsData = useSelector(state => state.projectReducer.projects);
  
  const [ length, setLength ] = useState(0);
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);
  const [ addProject, setAddProject ] = useState(false);


  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await callApi.get('/project', {
        headers:{
          'userToken' : `${Cookies.get('USER_TOKEN') || ''}`
        }
      });
      const data = response.data;
      if(data.status === 200){
        setLength(data.data.metadata[0]?.total);
        dispatch(addProjects([...data.data.data]));
      }
    }
    fetchData();

  },[dispatch]);

  const handleProjectCreation =  async (e, projName, projDetails, visibility)=>{
    e.preventDefault();
    try {
      const response = await callApi.post('/project/create',{
        name: projName.current.value,
        details: projDetails.current.value,
        visibility
      },{
        headers:{
        'userToken' : `${Cookies.get('USER_TOKEN') || ''}`
        }
    });
  
      const data = response.data;
      if(data.status !== 200){
        toast.error(data.message);
        return;
      }
      
      toast.success(data.message);
      setAddProject(false);
      setLength(prevLen => prevLen +1);
      dispatch(addProjects([data.data, ...projectsData]));
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  const fetchMoreProjects = async ()=>{
    const response = await callApi.get(`/project?skip=${projectsData.length}`,{
      headers:{
        'userToken' : `${Cookies.get('USER_TOKEN') || ''}`
      }
    });
    const data = response.data;

    if(data.status !== 200){
      toast.error(data.message);
      return;
    }

    dispatch(addProjects([...projectsData,...data.data.data]));
    setLength(data.data.metadata[0].total);
  }
  
  return (
    <>
      {isSidebarOpen && <Sidebar/>}
      <div className="head flex items-center justify-between px-4 py-2">
        <div className="flex gap-4 justify-center items-center">
          <button onClick={()=>setAddProject(true)} className="flex gap-2 items-center mt-0 Button">
            <span>Add Project</span>
            <span><RiAddLine/></span>
          </button>
        </div>
        {
          addProject && 
          <div className="absolute top-0 left-0">
            <AddProjectModal exeFunc={handleProjectCreation} modalCloser={setAddProject}/>
          </div>
        }
        { !isSidebarOpen ?
        <RiMenuFoldFill onClick={()=>setSidebarOpen(!isSidebarOpen)} className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"/>
        :
        <RiMenuUnfoldFill onClick={()=>setSidebarOpen(!isSidebarOpen)} className="text-2xl relative z-20 text-[#233d4d] dark:text-[#d9fadd]"/>
        }
      </div>
      <h1 className="text-2xl p-4">Recent Works</h1>
      <div id='scrollableDiv' className="work-container m-auto w-[90vw] h-[90vh] p-6 scroll-smooth">
        <InfiniteScroll
        dataLength={projectsData.length}
        next={fetchMoreProjects}
        height={'85vh'}
        hasMore={ (length > projectsData.length) ? true : false }
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        >
          {projectsData.length > 0 && projectsData.map((project)=>{
            return <ProjectCards key={project?._id} project={project}/>;
          })}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default DashBoard


