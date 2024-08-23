import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

function ProfilePic ({openModalDp, closeModalDp, modalIsOpenDp}) {

    let subtitle;

    const [profilePic, setNewProfilePic] = useState();
    const[imageUrl, setImageUrl] = useState("")

  
    

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
      
      // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
      Modal.setAppElement('#root');      

    const profilePicUpdate = async (e) => {
        e.preventDefault();
        try {
          const upload = await fetch(
            "https://insta-backend-hr3a.onrender.com/uploadProfilePic/",
            {
              method: "PUT",
              headers: {
                 "Content-Type": "application/json",
                 Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                "pic": imageUrl,
              })
            },
          );
          const data = await upload.json();
        
          console.log(data);
          
        }
        catch (error) {}
      }
     
    

  return (
    <div>
        <div>
      <Modal
        isOpen={modalIsOpenDp}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalDp}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <div>or change profile pic</div>
        <form onSubmit={profilePicUpdate}>
          <input value={imageUrl} onChange={(e) => setImageUrl (e.target.value)}/>
          <button type='submit'>Change Profile Pic</button>
        </form>
        <button onClick={closeModalDp}>close</button>
      </Modal>
    </div>


    </div>
  )
}

export default ProfilePic