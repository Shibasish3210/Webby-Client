import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAutoDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProject } from "../reduxToolkit/slices/projectSlice";
import callApi from "../config/api";
import { toast } from "react-toastify";

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
    const response = await callApi.delete(`/project/delete/${_id}`, { withCredentials: true });
    if(response.data.status !== 200){
      toast.error(response.data.message);
      return;
    }
    dispatch(deleteProject(_id));
    toast.success(response.data.message);
  }

  return (
    <Link to={`/workspace/${_id}`}  className="relative work-cards bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[60vh] w-full p-2 mt-2 flex gap-2 rounded-2xl mb-2">
        <iframe height={'100%'} width={'55%'} color="white" className="bg-black rounded-tl-xl rounded-bl-xl text-white" srcDoc={srcDoc}></iframe>
        <div className="info flex-grow flex flex-col justify-center gap-8 items-center">
          <h3 className="text-4xl">{`Name : ${name && name}`}</h3>
          <p className="text-xl">{`Created At : ${createdAt && createdAt}`}</p>
          <button onClick={handleProjectDeletion} className="btn absolute right-6 bottom-6 bg-gradient-to-l  from-white from-[1%] via-green-300 to-lime-600 text-gray-600 py-4 px-8">
            <MdOutlineAutoDelete  className="text-2xl "/>
          </button>
        </div>
    </Link>
  )
}

export default ProjectCards
