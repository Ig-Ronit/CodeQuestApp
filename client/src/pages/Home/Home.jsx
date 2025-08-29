import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../../Components/Rigthsidebar/Rightsidebar";
import Homemainbar from "../../Components/Homemainbar/Homemainbar";
import "../../App.css";
import "./Home.css";

const Home = ({ slidein }) => {
  const [toastMessage, setToastMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    // runs every time the route changes
    const message = localStorage.getItem("toastMessage");
    if (message) {
      setToastMessage(message);
      localStorage.removeItem("toastMessage");
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]); // <-- dependency: run on route change

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        {toastMessage && <div className="toast-popup">{toastMessage}</div>}
        <Homemainbar />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Home;
