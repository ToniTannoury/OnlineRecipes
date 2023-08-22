import { createContext, useContext, useReducer } from "react";

const initialUserState = {
  // user: null, 
  // followingPictures: [],
  // following:[],
  // followers:[],
  // posts:[],
  // userposts:[],
  // usersSearchResults: [], 
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
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
