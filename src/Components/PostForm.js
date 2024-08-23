import React, { useState } from 'react'

export default function PostForm({addPost, updateNewPost}){
    const[imageUrl, setImageUrl] = useState("")
    const[caption, setCaption] = useState("")

    function submitHandler(e){
        e.preventDefault()
        
        console.log(imageUrl, caption)

        addPost({imageUrl, caption})

        setCaption("")
        setImageUrl("")
        updateNewPost()
    }

  return (
    <div>
        <form onSubmit={submitHandler} className='form-container'>
            <div className='form-group'>
                <label htmlFor='imageUrl'>Image Url</label>
                <input id='imageUrl' value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} type='text' className='form-control'>
                </input>
            </div>
            <div className='form-group'>
                <label htmlFor='caption'> Caption</label>
                <input id='caption' value={caption} onChange={(e)=>{setCaption(e.target.value)}}
                type='text' className='form-control'>
                </input>
            </div>
            <button type='submit'>Upload Post</button>
        </form>

    </div>
  )
}