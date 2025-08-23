import React, { useState, useEffect } from "react";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchallusers } from "../../action/users";
import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../Components/Avatar/Avatar";
import Editprofileform from "./Editprofileform";
import Profilebio from "./Profilebio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";

const Userprofile = ({ slidein }) => {
  const { id } = useParams();
  const [Switch, setswitch] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersreducer);
  const currentprofile = users.find((user) => user._id === id);
  const currentuser = useSelector((state) => state.currentuserreducer);

  // Debug logs
  console.log("Userprofile: id from params:", id);
  console.log("Userprofile: users in Redux:", users);
  console.log("Userprofile: currentprofile:", currentprofile);

  useEffect(() => {
    if (!users || users.length === 0) {
      console.log("Userprofile: users empty, dispatching fetchallusers()");
      dispatch(fetchallusers());
    }
  }, [dispatch, users]);

  if (!currentprofile) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <span>Loading user profile...</span>
        <pre
          style={{
            textAlign: "left",
            margin: "1rem auto",
            maxWidth: 600,
            background: "#f8f8f8",
            padding: 10,
          }}
        >
          Debug info:\n id: {id}\n users: {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentprofile.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentprofile.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentprofile.joinedon).fromNow()}
                </p>
              </div>
            </div>
            {currentuser?.result?._id === id && (
              <button
                className="edit-profile-btn"
                type="button"
                onClick={() => setswitch(true)}
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          {Switch ? (
            <Editprofileform currentuser={currentuser} setswitch={setswitch} />
          ) : (
            <Profilebio currentprofile={currentprofile} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Userprofile;
