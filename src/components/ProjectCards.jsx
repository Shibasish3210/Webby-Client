import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAutoDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProject } from "../reduxToolkit/slices/projectSlice";
import callApi from "../config/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialProj = {
  name: "test",
  createdAt: new Date(),
  html: '<h1>Test</h1>',
  css: '',
  js: '',
}

const ProjectCards = ({project = initialProj}) => {
  const dispatch = useDispatch();
  const [ srcDoc, setSrcDoc ] = useState('');
  const {name, createdAt, html , css, js, _id} = project;

  useEffect(()=>{
    setSrcDoc(`
      <html>
      <body>
      ${html ? html : ''}
      <style>${css ? css: ''}</style>
      <script>${js? js: ''}</script>
      </body>
      </html>
    `)
  },[html, css, js]);

  const handleProjectDeletion = async (e)=>{
    e.preventDefault();
    const response = await callApi.delete(`/project/delete/${_id}`, {
      headers: {
        userToken: Cookies.get('USER_TOKEN')
      }
    });
    if(response.data.status !== 200){
      toast.error(response.data.message);
      return;
    }
    dispatch(deleteProject(_id));
    toast.success(response.data.message);
  }

  return (
    <Link to={`/workspace/${_id}`}  className="relative work-cards bg-gradient-to-r via-[#fe7f2d] to-[#22577a] from-[#fcca46] opacity-80 transition-all  hover:shadow-2xl hover:opacity-100 h-[60vh] w-[95%] m-auto p-2 mt-2 flex gap-2 rounded-2xl mb-8">
        <iframe height={'100%'} width={'55%'} color="white" className="bg-black rounded-tl-xl rounded-bl-xl text-white" srcDoc={srcDoc}></iframe>
        <div className="info flex-grow flex flex-col justify-center gap-8 items-center">
          <h3 className="text-4xl">{`Name : ${name && name}`}</h3>
          <p className="text-xl">{`Created At : ${createdAt && createdAt}`}</p>
          <button className='Button absolute right-8 bottom-8 flex gap-2 align-middle' onClick={handleProjectDeletion} >
            <span>Delete</span><MdOutlineAutoDelete  className="text-2xl "/>
          </button>
        </div>
    </Link>
  )
}

export default ProjectCards
