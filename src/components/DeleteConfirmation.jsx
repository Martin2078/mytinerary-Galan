import axios from 'axios'
import React from 'react'

const DeleteConfirmation = ({setOpenDelete,comment,toast,token,setRender}) => {

    

    async function deleteComment() {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let response = await axios.delete(`http://localhost:8080/comments/${comment._id}`,headers)
        
        if (response.data.success==true) {
            toast.success(response.data.message)
            setTimeout(()=>{ setRender(prev=>!prev);setOpenDelete(false)},2000)
        }
    }
  return (
    <div className='w-full min-h-[20vh] border-t flex flex-col py-2'>
        <div className='w-full h-4/6 flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold'>Are you sure?</p>
            <p className='text-xl'>You will delete this comment</p>
        </div>
        <div className='w-full h-2/6 flex items-center justify-center gap-5'>
            <button onClick={()=>setOpenDelete(false)} className='w-3/12 h-4/6 bg-red-600 rounded-lg text-white font-semibold text-lg'>Cancel</button>
            <button onClick={()=>deleteComment()} className='w-3/12 h-4/6 rounded-lg bg-[#2dc77f] text-white font-semibold text-lg'>Confirm</button>
        </div>
    </div>
  )
}

export default DeleteConfirmation