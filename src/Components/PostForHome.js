import React, { useEffect, useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const PostForHome = ({
  newPost,
  likePost,
  username,
  fetchAllPosts,
  URL,
  updateNewPost,
  Photo,
}) => {
  const [posts, setPosts] = useState([]);

  const [comment, setComment] = useState("");
  const [isCommentBox, setIsCommentBox] = useState(false)

  function toggleCommentBox(){

  }


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://insta-backend-hr3a.onrender.com/allposts",
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
        setPosts(data);
      } catch (e) {}
    };
    fetchPosts();
  }, [newPost]);

  async function handleLike(postId) {
    console.log("yes");
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/like",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            postId: postId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Liked Successfully");
      updateNewPost();
      console.log("yes");
    } catch (e) {
      console.log(e);
    }
  }

  async function unlikePost(postId) {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/unlike",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            postId: postId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("UnLiked Successfully");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  }

  async function commentPost(postId) {
    try {
      const response = await fetch(
        "https://insta-backend-hr3a.onrender.com/comment",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: comment,
            postId: postId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Comment Successfully");
      setComment("");
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="PostList">
      {posts &&
        posts.map((post, index) => (
          <div className="card-out">
            <div className="Card">
              <div className="card-top">
                <div>
                  <img
                    src={
                      post.postedBy.Photo
                        ? post.postedBy.Photo
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                    alt=""
                    style={{ width: "10%", borderRadius: "50%" }}
                  ></img>
                  <span style={{ marginLeft: "10px" }}>
                  <Link to={`/userprofile?userId=${post.postedBy._id}`}><span style={styles.feedUserName}>{post.postedBy.name}</span></Link>
                  </span>
                </div>
              </div>
              <img src={post.photo} class="card-img-top" alt=" "></img>
              <div className="card-body">
                <div className="buttons" style={{ width: "100%" }}>
                  <div
                    className="button"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <span>
                      {post.likes.includes(localStorage.getItem("userId")) ? (
                        <i
                          class="fa-solid fa-2x fa-heart"
                          style={{ color: "#fc0303" }}
                          onClick={() => unlikePost(post._id)}
                        ></i>
                      ) : (
                        <i
                          class="fa-regular fa-2x fa-heart"
                          onClick={() => handleLike(post._id)}
                        />
                      )}
                    </span>

                    <i class="fa-regular fa-2x fa-comment"></i>
                    <i class="fa-regular fa-2x fa-paper-plane"></i>
                  </div>
                  <b>
                    <div className="likes">
                      {post.likes.length} {post.likes === 1 ? "like" : "likes"}
                    </div>
                  </b>
                  <p className="card-test">
                    <b>{post.postedBy.name}</b>
                    {post.body}
                  </p>
                  <div
                    style={{
                      height: "100px",
                      borderTop: "1px solid #ccc",
                      overflowY: "scroll",
                    }}
                  >
                    {post.comments.map((commentDetail) => (
                      <div
                        key={commentDetail._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "0px 10px",
                        }}
                      >
                        <p>{commentDetail.comment}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderTop: "1px solid black",
                    }}
                  >
                    <input
                      type="text"
                      style={{ padding: "7px", border: "none", flex: 1 }}
                      placeholder="Add your comment here....."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      style={{
                        background: "black",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#fff",
                        padding: "12px",
                        border: "none",
                      }}
                      onClick={() => commentPost(post._id)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};

export default PostForHome;

const styles = {
    feedUserName: {
        fontWeight: 'bold',
        
    }
}
