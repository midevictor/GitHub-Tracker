import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";  

function UserSearch() {
  const [text, setText] = useState("");

  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      // @todo -search github users
      searchUsers(text);

      setText("");
    }
  };
  return (
    <div className="grid grid-cols-1 xl,lg,md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Users"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 rounded-l-none w-36 btn btn-lg btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={clearUsers} className="btn btn-ghost btn-lg bg-indigo-700">Clear</button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
