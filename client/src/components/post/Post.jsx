import "./post.css";
import { useState ,useEffect} from "react";
import axios from 'axios'
// import{format} from 'timeago.js'
import{Link} from 'react-router-dom'
export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const PF = process.env.REACT_APP_PUPLIC_FOLDER;
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  const fetchUser = async()=>{
     const res =  await axios.get(`/api/user?userId=${post.userId}`);
     console.log(res.data)
     setUser(res.data);
   }
   useEffect(()=>{
    fetchUser()
   },[post.userId])
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
           <Link to={`profile/${user.username}`}>
           <img
              className="postProfileImg"
              src={user.profilePicture || PF+'person/6.jpeg'}
              alt=""
            />
           </Link>

            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{/*format*/(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
          
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
