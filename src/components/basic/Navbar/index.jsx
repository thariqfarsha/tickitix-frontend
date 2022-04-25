import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleNavigate = (nav) => {
    navigate(`/${nav}`);
  };

  return (
    <>
      <Link to="/basic/counter">Counter App</Link> | <Link to="/basic/react">Basic React</Link> |{" "}
      <button onClick={() => handleNavigate("")}>Home</button> |{" "}
      <button onClick={() => handleNavigate("list-movie")}>List Movie</button> |{" "}
      <button onClick={handleLogout}>Logout</button> |{" "}
      <button onClick={() => handleNavigate("signin")}>Logout</button>
    </>
  );
}

export default Navbar;
