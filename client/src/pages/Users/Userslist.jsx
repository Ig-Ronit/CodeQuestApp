import React from "react";
import "./Users.css";
import User from "./User";
import { useSelector } from "react-redux";

const Userslist = () => {
  const users = useSelector((state) => state.usersreducer);

  // console.log("Users from Redux state:", users);

  if (!Array.isArray(users)) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="user-list-container">
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map((user) => <User user={user} key={user._id} />)
      )}
    </div>
  );
};

export default Userslist;
