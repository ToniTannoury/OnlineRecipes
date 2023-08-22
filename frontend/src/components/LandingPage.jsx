// import React from "react";
// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext";
// import "../styles/LandingPage.css";
// import PofileInfoBar from "./PofileInfoBar";
// import Navbar from "./Navbar";
// import Carousel from "./Carousel";
// import Post from "./Post";
// import LogoutButton from "./LogoutButton";
// const LandingPage = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const { userState, userDispatch } = useContext(UserContext);
//   console.log(userState)
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/Login");
//       return;
//     }

//     getUser().then(() => {
//       setIsLoading(false);
//       getPosts();
//       getUserPosts();
//     });
//   }, []);
//   const getUser = async () => {
//     const response = await fetch("http://127.0.0.1:8000/api/user/get-profile", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const data = await response.json();
//     console.log(data)
//     setUser(data.user);
//   };
//   const getPosts = async () => {
//     const response = await fetch(
//       "http://127.0.0.1:8000/api/user/following-posts",
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );
//     const data = await response.json();
//       userDispatch({ type: "SET_POSTS", payload: data.following_posts });
//   };
//   const getUserPosts = async () => {
//     const response = await fetch("http://127.0.0.1:8000/api/user/get-posts", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await response.json();
//     console.log(1111111)
//     console.log(data)
//     if(data.posts.length!==0){
//       userDispatch({ type: "SET_USER_POSTS", payload: data.posts });

//     }
//   };

//   return (
//     <div className="landing-page">
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="left-side">
//             <div className="left-header">
//               <img
//                 className="image"
//                 src={require("../assets/94409a775c02d7658dd6e7ba88429b63-removebg-preview.png")}
//               />
//               <h2 className="left-title">Instagram</h2>
//             </div>
//             <div className="profile-image">
//               <img
//                 className="profile-pic-image"
//                 src={`http://127.0.0.1:8000/images/${user.pic_url}`}
//               />
//             </div>
//             <div className="left-names">
//               <h3>{user.username}</h3>
//               <p>{user.name}</p>
//             </div>
//             <div className="logout">
//               <LogoutButton />
//             </div>
//             <div>
//               <PofileInfoBar />
//             </div>
//           </div>
//           <div className="right-container">
//             <div className="right-side">
//               <Navbar />

//               <Carousel followings={userState.following} />
//               <div className="posts-container">
//                 {userState.posts.map((post) => (
//                   <Post post={post} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LandingPage;
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      aa
    </div>
  )
}

export default LandingPage

