// import React, { useContext } from "react";
// import UserContext from "../context/UserContext";
// import "../styles/UserSearchItem.css";

// const UserSearchItem = ({ user, debouncedSearchVal }) => {
//   const { userState, userDispatch } = useContext(UserContext);
//   const isUserFollowed = userState.following.some(
//     (followedUser) => followedUser.id === user.id,
//   );

//   const handleFollowButton = async () => {
//     const response = await fetch(
//       `http://127.0.0.1:8000/api/user/follow-user/${user.id}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );

//     const data = await response.json();

//     if (!data.error) {
//       userDispatch({ type: "ADD_FOLLOWING", payload: data.user });
//       return data;
//     }
//   };
//   const handleUnfollowButton = async () => {
//     const response = await fetch(
//       `http://127.0.0.1:8000/api/user/unfollow-user/${user.id}`,
//       {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );

//     const data = await response.json();

//     if (!data.error) {
//       userDispatch({ type: "REMOVE_FOLLOWING", payload: data.user });
//       return data;
//     }
//   };

//   const handleFollowUnfollowButtonClick = () => {
//     if (isUserFollowed) {
//       handleUnfollowButton();
//     } else {
//       handleFollowButton();
//     }
//   };
//   return (
//     <div id={`${user.id}`} className="user-search-item">
//       <div className="search-profile-image">
//         <img
//           className="profile-pic-image-search"
//           src={`http://127.0.0.1:8000/images/${user.pic_url}`}
//           alt={user.name}
//         />
//       </div>
//       <div>
//         <p className="search-item-text-name">
//           {user.name}
//         </p>
//         <p className="search-item-text">
//           {user.username}
//         </p>
//       </div>
//       <button
//         onClick={handleFollowUnfollowButtonClick}
//         className="follow-button"
//       >
//         {isUserFollowed ? "Unfollow" : "Follow"}
//       </button>
//     </div>
//   );
// };

// export default UserSearchItem;
