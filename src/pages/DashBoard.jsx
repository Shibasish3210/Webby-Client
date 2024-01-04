import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { RiMenuFoldFill, RiMenuUnfoldFill, RiAddLine } from "react-icons/ri";
import ProjectCards from "../components/ProjectCards"
import Sidebar from "../components/Sidebar";
import callApi from "../config/api";
import { addProjects } from "../reduxToolkit/slices/projectSlice";
import Cookies from "js-cookie";


const DashBoard = () => {
  const dispatch = useDispatch();
  const projectsData = useSelector(state => state.projectReducer.projects);
  
  const [ length, setLength ] = useState(0);
  const [ newProj, setNewProject ] = useState('');
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);


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

  const handleProjectCreation =  async ()=>{
    try {
      const response = await callApi.post('/project/create',{
        name: newProj
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
      setNewProject('');
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
          <input value={newProj} onChange={e=>setNewProject(e.target.value)} className="Input border-1 border-[#c7f9cc]" type="text" placeholder="Enter New Project Name" />
          <button onClick={handleProjectCreation} className="flex gap-2 items-center mt-0 Button">
            <span>Add Project</span>
            <span><RiAddLine/></span>
          </button>
        </div>
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


