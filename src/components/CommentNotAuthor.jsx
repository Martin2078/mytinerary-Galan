import React, { useEffect, useState } from 'react'
import Description from './Description';
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import liked from '../assets/liked.png'
import disliked from '../assets/disliked.png'
import { useAnimate } from 'framer-motion';
const CommentNotAuthor = ({ comment, setRender, setLogged, user, token }) => {
    const [scope, animate] = useAnimate()

    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    function valorationCircles() {
        let template = []
        for (let i = 0; i < 5; i++) {
            template.push(<span className={`w-5 h-5 rounded-full border border-[#2dc77f] ${i < comment.valoration.value ? "bg-[#2dc77f]" : "bg-white"}`}></span>)
        }
        return template
    }

    function resetAnimation() {
        animate(scope.current,{
            scale:1
        },{duration:0.5})
    }
    function animationReactions() {
        animate(scope.current,{
            scale:0.5
        },{duration:0.5})
    }

    async function likeComment() {
        
        
        if (user == null) {
            setLogged(true)
            toast.error('You must be logged to like this comment!')
            return
        }
        let object = {
            commentId: comment._id,
            userId: user._id
        }
        let response = await axios.put(`http://localhost:8080/comments/like`, object, headers)
        if (response.data.success == true) {
            setRender(prev => !prev)
        }
    }
    async function dislikeComment() {
       
        if (user == null) {
            setLogged(true)
            toast.error('You must be logged to dislike this comment!')
            return
        }

        let object = {
            commentId: comment._id,
            userId: user._id
        }
        let response = await axios.put(`http://localhost:8080/comments/dislike`, object, headers)
        if (response.data.success == true) {
            setRender(prev => !prev)
        }
    }

    useEffect(() => {

    }, [])
    return (
        <div className='w-full min-h-[20vh] border-t flex flex-col py-2'>
            <Toaster position='top-center' />
            <div className='w-full h-[5vh] flex items-center justify-between'>
                <div className='w-1/2 h-full flex items-center gap-1'>
                    {valorationCircles()}
                </div>
                <div className='flex gap-2'>
                    <p className='font-semibold'>{comment.userId.name} {comment.userId.surname}</p>
                    <img className='w-8 h-8 object-cover rounded-full' src={comment.userId.photo} alt="" />
                </div>
            </div>
            <div className='w-full min-h-[8vh] '>
                <h1 className='text-xl font-semibold'>{comment.title}</h1>
                <Description info={comment.text} amountCharacters={80} />
            </div>
            {comment.photo.length > 0 && <div className='w-full h-[12vh] lg:h-[10vh] xl:h-[15vh] border flex gap-2 overflow-x-auto'>
                {comment.photo.map(image => {
                    return <img className='h-full min-w-[35vw] md:min-w-[20vw] lg:w-[10vw] object-cover' src={image} alt="" />
                })}
            </div>}
            <div className='w-full h-[5vh] lg:h-[4vh] flex gap-5 items-end'>
                <div className='flex items-center gap-2'>
                    <button ref={scope} className='w-4' onClick={() => likeComment()}><img  src={comment.likes.find(id => id == user?._id) ? liked : like} alt="" /></button>
                    <p>{comment.likes.length}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button ref={scope} onClick={() => dislikeComment()}><img className='w-4' src={comment.dislikes.find(id => id == user?._id) ? disliked : dislike} alt="" /></button>
                    <p>{comment.dislikes.length}</p>
                </div>
            </div>
        </div >
    )
}

export default CommentNotAuthor