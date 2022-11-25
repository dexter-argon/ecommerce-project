import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER',
}

// as the actual value you want to access
export const UserContext = createContext(null);

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}
const INITIAL_STATE = {
  currentUser: null,
}
export const UserProvider = ({ children }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // return unsubscribe;
  }, []);

  // const [currentUser, setCurrentUser] = useState(null);
  const [ { currentUser } , dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// <UserProvider><Descendent><Descendent/></UserProvider>
// <UserContext.Provider value={value}><Descendent><Descendent/></UserContext.Provider>
/* 

export const userReducer =(state, action) => {
  return {currentUser: null }
}
*/