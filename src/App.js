import "./App.css";
import PostForm from "./Components/PostForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/PostForm.css";
import PostList from "./Components/PostList";
import { useState } from "react";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home"
import "./Components/SignIn.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage";
import PostForHome from "./Components/PostForHome";
import UserProfile from "./Components/UsersProfile";

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [newPost, setNewPost] = useState(true);
  //"!!" used to show true & false
  const navigate = useNavigate

  function updateNewPost() {
    setNewPost((prev) => !prev);
  }

  const addPost = (data) => {
    let storedPost = JSON.parse(localStorage.getItem("posts")) || [];
    const newPostArray = [...storedPost, data];
    console.log(newPostArray);

    console.log(data);
    localStorage.setItem("posts", JSON.stringify(newPostArray));
  };

  // useEffect(()=> {
  //   localStorage.getItem("posts")
  // },[])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={isLogin?<Navigate to={"/home"}></Navigate>:<Login setIsLogin={setIsLogin}/>}></Route>
          <Route path="/signup" element={<SignIn/>}></Route>
          <Route path="/postform" element={<PostForm addPost={addPost} updateNewPost={updateNewPost} />}></Route>
          <Route path="/postlist" element={<PostList newPost={newPost} updateNewPost={updateNewPost} />}></Route>
          <Route path="/home" element={isLogin? <Home URL="https://insta-backend-hr3a.onrender.com/allposts" setIsLogin={setIsLogin}/>:<Navigate to={"/signin"}></Navigate>}></Route>
          <Route path="/profilepage" element={<ProfilePage URL="https://insta-backend-hr3a.onrender.com/myposts"/>}></Route>
          <Route path="/userprofile" element={<UserProfile></UserProfile>}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
