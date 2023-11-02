import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import ReactModal from 'react-modal';
import Login from "./app/components/Login";
import Register from "./app/components/Register";
import Home from "./app/components/Home";
import Profile from "./app/components/Profile";
import BoardUser from "./app/components/BoardUser";
import BoardAdmin from "./app/components/BoardAdmin";
import EventBus from "./app/common/EventBus";
import { logout } from "./app/slices/auth";

ReactModal.setAppElement("#root");

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
    setIsLoggedIn(false); // Update login status when logging out
  }, [dispatch]);

  const toggleLoginSignupModal = () => {
    setShowLoginSignupModal(!showLoginSignupModal);
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setIsLoggedIn(true); // Update login status when user is logged in
    } else {
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: 'rgba(77, 255, 238, 0.8)' }}>
          <Link to={"/"} className="navbar-brand" style={{ color: 'black' }}>
            NodeReactAuth
          </Link>
          <div className="navbar-nav mr-auto" style={{ color: 'black' }}>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link" style={{ color: 'black' }}>
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" style={{ color: 'black' }}>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link" style={{ color: 'black' }}> 
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut} style={{ color: 'black' }}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ backgroundColor: "transparent", border: "none", color: "black", cursor: "pointer" }}
                  onClick={toggleLoginSignupModal}
                >
                  Login / Sign Up
                </button>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>

      <ReactModal
        isOpen={showLoginSignupModal && !isLoggedIn} // Hide modal when logged in
        onAfterOpen={() => document.body.classList.add('modal-open')}
        onRequestClose={toggleLoginSignupModal}
        contentLabel="Login / Sign Up Modal"
        closeTimeoutMS={300}
        className={{
          base: 'login-signup-modal',
          afterOpen: 'modal-entered',
          beforeClose: 'modal-exiting',
        }}
        overlayClassName={{
          base: 'modal-container',
          afterOpen: 'modal-entered',
          beforeClose: 'modal-exiting',
        }}
      >
        <div className="modal-body">
          {showLoginForm ? <Login /> : <Register />}
          <button onClick={toggleForm}>
            {showLoginForm ? "Switch to Sign Up" : "Switch to Login"}
          </button>
        </div>
      </ReactModal>
    </Router>
  );
};

export default App;
