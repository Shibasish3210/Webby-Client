import { useRef } from 'react'
import Input from '../shared/Input'


const DeleteProjectModal = ({ name, exeFunc, modalCloser }) => {
    const projectName = useRef();
  return (
    <div className="fixed w-screen h-screen z-40 bg-[#383656f2] p-0 m-0">
        <form className="z-50 ">
          <h1 className="text-red-400 mb-6">Please Fill Your Project Name( {name} ) To Delete Project!</h1>
          <div className="inputFields">
          <Input id='modal-del-name' label='Project Name :' placeholder='Enter this project name to delete' refrence={projectName}/>
          </div>
          <button type="submit" className='Button mt-32' onClick={(e)=>exeFunc(e,projectName.current.value)}>Delete Project</button>
          <button className='Button mt-8' onClick={()=>modalCloser(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default DeleteProjectModal
