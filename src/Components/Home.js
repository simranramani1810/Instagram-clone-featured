import React from 'react'
import "./Home.css"
import Logout from './Logout.js'
import PostList from "./PostList"
import CreatePost from './CreatePost.js'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddIcon from '@mui/icons-material/Add';
import ProfilePage from './ProfilePage.js'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostForHome from './PostForHome.js'

const Home = ({URL}) => {
  
  const fetchAllPosts = async () => {
    try{
      const response = await fetch(URL, {
            
               method: "POST",
               headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
               },
               })
            const data = await response.json();
            console.log(data);
    }
    catch (error) {}
  }

  const [LogoutModal, setLogoutModal] = useState(false);
  const openLogoutModal = () => setLogoutModal(true)
  const closeLogoutModal = () => setLogoutModal(false)

  const [ProfilePage, setIsProfilePage] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  const [newPost, setNewPost] = useState(true);

  function openProfilePage() {
    setIsProfilePage(true);
  }

  function updateNewPost() {
    setNewPost((prev) => !prev);
  }
  
    function openModal() {
        setIsOpen(true);
      }
      function closeModal() {
        setIsOpen(false);
      }

  return (
    <div>
        <div className='Navbar'>
        <div className="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram logo"
        className="header__logo"
      />

      <div className="header__search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>

      <div className="header__icons">

        <i class="fa-regular fa-2x fa-square-plus" style={{}} onClick={openModal}></i>
        <i className="fas fa-2x fa-home"></i>
        
        
        {/* <FontAwesomeIcon icon="fa-regular fa-user" /> */}
        <Link to = {"/profilepage"} ><i class="fa-regular fa-2x fa-user"></i></Link>
         
        <img src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/7-512.png" className="img-header" alt="" style={{width:"40px"}}></img>
        <i class="fa-solid fa-2x fa-right-from-bracket" onClick={openLogoutModal}></i>
      </div>
        </div>
        </div>
        <div className="sidebarr">
      <div className="sidebar__userInfo">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <div className='app__body'></div>
        <div className="sidebarr__info">
          <h4>___.simrannnnn</h4>
          <p>Simran Ramani</p>
        </div>
      </div>

      <div className="sidebar__suggestions">
        
        <h4>Suggestions for you</h4>
      </div>
      <div className='postfeed'>

      {/* <PostList newPost={newPost} URL="https://insta-backend-hr3a.onrender.com/allposts" /> */}
      <PostForHome newPost={newPost} updateNewPost={updateNewPost}></PostForHome>

        <CreatePost modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        <Logout LogoutModal={LogoutModal} closeLogoutModal={closeLogoutModal} />
        </div>
    </div>
    </div>
  )
}

export default Home