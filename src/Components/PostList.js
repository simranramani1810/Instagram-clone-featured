import React, { useEffect, useState } from "react";
import '../App.css';
import { FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Photo } from "@mui/icons-material";

const PostList = ({ newPost, likePost, username, fetchAllPosts, URL, updateNewPost, Photo}) => {
  const [posts, setPosts] = useState([
    ]);


    // likePost = (index) => {
    //   const newPosts = [...posts];
    //   newPosts[index].likes = (newPosts[index].likes || 0) + 1;
    //   setPosts(newPosts);
    //   localStorage.setItem("posts", JSON.stringify(newPosts));
    // };

    // deletePost = (index) => {
    //   const newPosts = posts.filter((_, i) => i !== index);
    //   setPosts(newPosts);
    //   localStorage.setItem("posts", JSON.stringify(newPosts));
    // };

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await fetch(URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        },
    
      );
        const data = await response.json();
        console.log(data);
        setPosts(data);

      }
      catch(e){}
    }
    fetchPosts();
    
  }, [newPost]);

  async function handleLike(postId) {
    console.log("yes")
    try{
      const response = await fetch("https://insta-backend-hr3a.onrender.com/like",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            postId: postId
          })
          
        }
      )
      const data = await response.json();
          console.log(data);
          toast.success("Liked Successfully")
          updateNewPost()
          console.log("yes")

    }
    catch(e) {
      console.log(e)
    }
  }

  async function unlikePost(postId) {
  
    try {
        const response = await fetch("https://insta-backend-hr3a.onrender.com/unlike",{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                postId:postId
            })
        });
        const data = await response.json();
        console.log(data);
        toast.success("UnLiked Successfully")
        updateNewPost()

    } catch (err) {
        console.log(err);
    }
}

const deleteHandler = async (_id) => {
  try {
    const response = await fetch(`https://insta-backend-hr3a.onrender.com/deletePost/${_id}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    const data = await response.json();
    console.log(data);
    updateNewPost()
    
  }
  catch (e) {
    console.log(e)
  }
}

  return (
    <div className="PostList">
      {posts &&
        posts.map((post, index) => (
          <div className="card-out">
            <div className="Card">
              <div className="card-top">
                <div><img src={Photo} alt="" style={{width:"10%", borderRadius:"50%"}}></img>
              <span style={{marginLeft:"10px"}}><b>
                {username}
                </b></span></div>
              </div>
              <img src={post.photo} class="card-img-top" alt=" "></img>
              <div className="card-body">
                
                <div className="buttons" style={{width: "100%"}}>
                  <div className="button" style={{display: "flex", gap:"10px"}}>
                  <span>{post.likes.includes(localStorage.getItem("userId")) ? <i class="fa-solid fa-2x fa-heart" style={{"color": "#fc0303"}} onClick={()=>unlikePost(post._id)}></i>:<i class="fa-regular fa-2x fa-heart" onClick={()=> handleLike(post._id)}/>}</span>
              
                  <i class="fa-regular fa-2x fa-comment"></i>
                  <i class="fa-regular fa-2x fa-paper-plane"></i>
                 </div>
                  <span><img src="https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Trash-64.png" alt="" onClick={()=>deleteHandler(post._id)} style={{width: "30px", float:"right"}}></img></span>
                  <b><div className="likes">
                    {post.likes.length} {post.likes === 1 ? "like" : "likes"}
                  </div></b>
                  <p className="card-test"><b>{post.postedBy.name}</b>{post.body}</p>
                  <p style={{}}>View all 20 comments</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    <ToastContainer />

    </div>
  );
};

export default PostList;
