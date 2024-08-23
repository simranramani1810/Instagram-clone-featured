import React from 'react'
import Modal from 'react-modal';
import PostForm from './PostForm';
import { useState } from 'react';
import PostList from './PostList';

Modal.setAppElement('#root');
const CreatePost = ({modalIsOpen, setIsOpen}) => {

    const [newPost, setNewPost] = useState(true);

    function updateNewPost() {
        setNewPost((prev) => !prev);
      }

//   const addPost = (data) => {
//     try{
//          const response = await fetch("https://insta-backend-hr3a.onrender.com", {

         
//             method: "POST",
//             Headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 "body": caption,
//                 "pic": imageUrl,
//             }),
//         }
//          );
         
//     }
//     catch(e){

//     }
//   }

  const[imageUrl, setImageUrl] = useState("")
    const[caption, setCaption] = useState("")

    async function submitHandler(e){
        e.preventDefault()
        
        console.log(imageUrl, caption)

        try{
            const response = await fetch("https://insta-backend-hr3a.onrender.com/createPost", {
            
               method: "POST",
               headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
               },
               body: JSON.stringify({
                   "body": caption,
                   "pic": imageUrl,
               }),
           }
            );
            const data = await response.json();
            console.log(data);
       }
       catch(e){
   
       }

        setCaption("")
        setImageUrl("")
        updateNewPost()
    }
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        
        },
      };
    let subtitle;
    
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    
  return (
    <div className='create-post'>
        <div>
      {/* <button onClick={openModal}></button> */}
      <Modal
        isOpen={modalIsOpen}
    //    onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Post</h2>
        
        <div>
            {/* <PostForm addPost={addPost} updateNewPost={updateNewPost}/>
             */}
             <div className='postform'>
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
        </div>
        <button onClick={closeModal} className=''>close</button>
        
      </Modal>
    </div>
    </div>
  )
}

export default CreatePost