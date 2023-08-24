import { createContext, useContext, useReducer } from "react";

const initialUserState = {

};

const userReducer = (state, action) => {
  switch (action.type) {
    case "INIT_CONTEXT":
      return action.payload ;
    case "CREATE_POST":
      
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case 'DELETE_POST':
      console.log(action.payload)
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        liked_posts: state.likes.filter(post => post.id !== action.payload),
      };
      case "CREATE_MEAL":
        return {
          ...state,
          meals: [...state.meals, action.payload],
        };
      case "REMOVE_MEAL":
        return {
          ...state,
          meals: state.meals.filter(meal => meal.id !== action.payload),
        };
      case 'ADD_LIKE':
        console.log(action.payload)
        return {
          ...state,
          likes: [...state.likes, action.payload],
        };
      case 'REMOVE_LIKE':
        return {
          ...state,
          likes: state.likes.filter(post => post.post.id !== action.payload),
        };
      case 'EDIT_POST':
        const editedPostId = action.payload.postId;
        const editedPostData = action.payload.editedData;
      console.log(editedPostData , editedPostId)
        const editedPostIndex = state.posts.findIndex(post => post.id === editedPostId);
        console.log(editedPostIndex)
        if (editedPostIndex !== -1) {
          const formDataToObject = (formData) => {
            const object = {};
          
            for (const [key, value] of formData.entries()) {

                object[key] = value;
             
            }
          
            return object;
          };
          
          const newData = formDataToObject(editedPostData)
          if (newData.hasOwnProperty("image_url") && newData.image_url === 'undefined') {
            delete newData["image_url"];
          }
          const updatedPosts = [...state.posts];
          updatedPosts[editedPostIndex] = {
            ...updatedPosts[editedPostIndex],
            ...newData,
          };
          console.log( updatedPosts[editedPostIndex])
          return {
            ...state,
            posts: updatedPosts,
          };
        }
  
        return state;
        case 'ADD_SHOPPING_LIST':
          return {
            ...state,
            shopping_lists: [...state.shopping_lists, action.payload],
          };
        case 'DELETE_SHOPPING_LIST':
          console.log(action.payload)
          return {
            ...state,
            shopping_lists: state.shopping_lists.filter(
              (list) => list.id !== action.payload
            ),
          };
          case 'ADD_COMMENT_TO_LIKED_POST': {
            const { postId, comment } = action.payload;
            const likedPostIndex = state.likes.findIndex(post => post.post_id === postId);
            
            if (likedPostIndex !== -1) {
              const updatedLikedPosts = [...state.likes];
              const likedPost = updatedLikedPosts[likedPostIndex];
              
              likedPost.post.comments = [...likedPost.post.comments, comment];
              
              return {
                ...state,
                likes: updatedLikedPosts,
              };
            }
            
            return state;
          }
          case 'ADD_COMMENT_TO_OWN_POST': {
            const { postId, comment } = action.payload;
            const PostIndex = state.posts.findIndex(post => post.id === postId);
            
            if (PostIndex !== -1) {
              const updatedPosts = [...state.posts];
              const Post = updatedPosts[PostIndex];
              
              Post.comments = [...Post.comments, comment];
              
              return {
                ...state,
                likes: updatedPosts,
              };
            }
            
            return state;
          }
    default:
      return state;
  }
};

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext
