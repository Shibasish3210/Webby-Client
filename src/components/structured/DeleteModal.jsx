import { useRef } from "react";
import Input from "../shared/Input"

const DeletionModal = ({ exeFunc, modalCloser }) => {
  const deleteEmail = useRef();
  const deletePassword = useRef();

  return (
    <div className="fixed w-screen h-screen z-40 bg-[#383656f2] p-0 m-0">
        <form className="z-50 ">
          <h1 className="text-red-400 mb-6">Please Fill Your Original Email & Password To Delete!</h1>
          <Input id='modal-del-email' label='Enter your email' placeholder='xyz@gmail.com' refrence={deleteEmail}/>
          <Input id='modal-del-password' label='Enter your password' placeholder='(a-z),(A-Z),(0-9),(!-&)' refrence={deletePassword}/>
          <button type="submit" className='Button mt-32' onClick={(e)=>exeFunc(e,deleteEmail,deletePassword)}>Delete Account</button>
          <button className='Button mt-8' onClick={()=>modalCloser(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default DeletionModal
