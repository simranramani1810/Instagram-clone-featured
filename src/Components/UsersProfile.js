import React, { useEffect } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostList from "./PostList";
import Sidebar from "./SideBar";

function UserProfile() {

  const [profileData, setProfileData] = useState();

  const [newPost, setNewPost] = useState(true);

  function updateNewPost() {
    setNewPost((prev) => !prev);
  }

  const queryParams = new URLSearchParams(window.location.search)
    const userId = queryParams.get("userId")
   

  useEffect(() => {

    const profile = async () => {
      try {
        const response = await fetch(
          "https://insta-backend-hr3a.onrender.com/user/" +
            userId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
          <img alt=''
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
     
      <PostList newPost={newPost} username={profileData.user.userName} updateNewPost={updateNewPost} Photo={profileData.user.Photo} />
     }
     
    </div></div>
  );
}
export default UserProfile;
