//imported create Context
import { createContext, useReducer } from "react";
// import { parsePath } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
//iinitialized a variable to get contents from my environment variable 
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos:[],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //Get single search results
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    //error handling
    if (response.status === 404) {
      window.location = ".notFound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

const getUserRepos = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?per_page=10&sort=created:asc`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    //error handling
    if (response.status === 404) {
      window.location = ".notFound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    } 
  };


  //clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
