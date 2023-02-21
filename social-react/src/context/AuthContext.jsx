import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const userInfo = JSON.parse(localStorage.getItem("user"));
console.log(userInfo);

const INITIAL_STATE = {
  // user: {
  //   _id: "63f3437b2465bba62e5afdb8",
  //   username: "ashok",
  //   email: "ashok@gmail.com",
  //   password: "$2b$10$9bPwnIWgOg/InRgryxPK6Og0KTH9fab8I02g9IQv7KG052dGuM8Vu",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [],
  //   followings: ["63f343882465bba62e5afdbb"],
  //   isAdmin: false,
  //   createdAt: "2023-02-20T09:55:07.246Z",
  //   updatedAt: "2023-02-20T09:55:07.246Z",
  //   __v: 0,
  // },
  // user: null,
  user: userInfo,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  console.log(state);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
