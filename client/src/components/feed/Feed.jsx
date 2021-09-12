import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import React , {useEffect,useState} from 'react'
import axios from 'axios'
export default function Feed({username}) {
  const[posts,setPost]=useState([]);
  const fetchPost = async()=>{
   const res = username 
   ? await axios.get('/api/post/profile/'+username) 
   : await axios.get('/api/post/timeline/6136b64b2be8f77365ff852c');
   console.log(res);
  setPost(res.data);
  }
  useEffect(()=>{
    fetchPost()
  },[username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {
          posts.map((p)=>(
            <Post key={p._id} post={p} />
          ))
        }
      </div>
    </div>
  );
}
