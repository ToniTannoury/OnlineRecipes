// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import Modal from "react-modal";
// import { FaSearch, FaBell, FaEnvelope, FaTimes } from "react-icons/fa";
// import "../styles/Navbar.css";
// import useDebounce from "../customHooks/useDebounce";
// import UserContext from "../context/UserContext";
// import UserSearchItem from "./UserSearchItem";

// const Navbar = () => {
//   const [inputValue, setInputValue] = useState("");
//   const debouncedSearchValue = useDebounce(inputValue, 700);
//   const { userState, userDispatch } = useContext(UserContext);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedPicture, setSelectedPicture] = useState(null);

//   useEffect(() => {
//     const searchForUser = async () => {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/user/search-users?query=${debouncedSearchValue}`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         },
//       );

//       const data = await response.json();

//       userDispatch({ type: "SET_USERS_SEARCH_RESULTS", payload: data.users });
//       return data;
//     };
//     searchForUser();
//   }, [debouncedSearchValue]);


//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setSelectedPicture(selectedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(selectedPicture)
//     if (!selectedPicture) {
//       console.log("No image selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image_url", selectedPicture);

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/user/create-post",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: formData,
//         },
//       );
//       const data = await response.json();
//       console.log(data)
//       if (response.ok) {
//         setModalIsOpen(false);
//         console.log(1111111111)
//         userDispatch({ type: "SET_USER_POSTS", payload: data.data });
//       } else {
//         console.log("Error creating post");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//     setSelectedPicture(null)
//   };

//   const handleClearInput = () => {
//     setInputValue("");
//   };


//   return (
//     <>
//       <div className="navbar">
//         <div className="navbar-left">
//           <div className="search-input">
//             <input
//               type="text"
//               placeholder="Search"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             {inputValue && (
//               <FaTimes className="clear-icon" onClick={handleClearInput} />
//             )}
//             <FaSearch className="search-icon" />
//           </div>
//         </div>
//         <div className="navbar-right">
//         <FaBell className={`navbar-icon`} />
//           <FaEnvelope className={`navbar-icon`} />
//           <button
//             onClick={() => setModalIsOpen(true)}
//             className="add-photo-button"
//           >
//             + Add Photo
//           </button>
//         </div>

//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={() => setModalIsOpen(false)}
//           contentLabel="Add Photo Modal"
//           className="modal"
//           overlayClassName="modal-overlay"
//         >
//           <h2>Add Photo</h2>
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="register-form-container"
//           >
//             <input
//               type="file"
//               name="profilePicture"
//               onChange={handleFileChange}
//             />
//             <button className="modal-submit" type="submit">Submit</button>
//             <button className="modal-close" onClick={() => setModalIsOpen(false)}>Close</button>
//           </form>
//         </Modal>
//       </div>
//       <div className="search-container">
//         {debouncedSearchValue &&
//           userState.usersSearchResults.map((user) => (
//             <UserSearchItem
//               user={user}
//               debouncedSearchVal={debouncedSearchValue}
//             />
//           ))}
//       </div>
//     </>
//   );
// };

// export default Navbar;
