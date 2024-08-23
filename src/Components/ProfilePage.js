import React, { useEffect } from "react";
import "./ProfilePage.css";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostList from "./PostList";
import ProfilePic from "./ProfilePic";
import Modal from "react-modal"
import Sidebar from "./SideBar";

function ProfilePage({URL}) {

  Modal.setAppElement('#root');
  let subtitle;
  const [modalIsOpenDp, setModalIsOpenDp] = useState(false);

  function openModalDp() {
    setModalIsOpenDp(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModalDp() {
    setModalIsOpenDp(false);
  }

  
  const [profileData, setProfileData] = useState();

  const [newPost, setNewPost] = useState(true);

  function updateNewPost() {
    setNewPost((prev) => !prev);
  }

  
  useEffect(() => {

    const profile = async () => {
      try {
        const response = await fetch(
          "https://insta-backend-hr3a.onrender.com/user/" +
            localStorage.getItem("_id"),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (e) {}
    };
    profile();

  }, [newPost]);

  return (
      <div className="SideBar_App">
      <Sidebar />
    <div className="profilePage">
    
      {profileData && (
        <div className="profileHeader">
          <img style={{cursor: "pointer"}} onClick={openModalDp} alt=''
            className="profileHeader__avatar"
            // src={user.avatar}
            // alt={user.username}
            src={profileData.user.Photo}
          />
          {/* <div className="profileHeader__info">
            
          </div> */}
          <div className="profileHeader">
            <div className="profileHeader__info">
              <div className="profileHeader__username">
                <h2>{profileData.user.userName}</h2>
                <Button
                  variant="outlined"
                  className="profileHeader__editButton"
                >
                  Edit Profile
                </Button>
              </div>
              <div className="profileHeader__stats">
                <span>
                  <strong>{profileData.post.length}</strong> posts
                </span>
                <span>
                  <strong>{profileData.user.followers.length}</strong> followers
                </span>
                <span>
                  <strong>{profileData.user.following.length}</strong> following
                </span>
              </div>
              <div className="profileHeader__bio">
                <strong>{profileData.user.name}</strong>
                <p>{profileData.user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        profileData &&
     
      <PostList newPost={newPost} username={profileData.user.userName} updateNewPost={updateNewPost} URL="https://insta-backend-hr3a.onrender.com/myposts" Photo={profileData.user.Photo} />
     }
     <ProfilePic openModalDp={openModalDp} closeModalDp= {closeModalDp} modalIsOpenDp={modalIsOpenDp}/>
     
    </div></div>
  );
}
export default ProfilePage;
