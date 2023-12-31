import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo/png/logo.png";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://project-3-manga-backend-2d7dcb1090ee.herokuapp.com/users/signup",
        {
          name,
          email,
          password,
          verifyPassword,
        }
      );
      if (response.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setVerifyPassword("");
        toast.success("Successfully signed up!", { autoClose: 1500 });
        console.log("Success");
        navigate("/signin");
      } else {
        toast.error("An error occurred", { autoClose: 1500 });
        console.log("Error:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred", { autoClose: 1500 });
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="username..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="verify password..."
            value={verifyPassword}
            onChange={(event) => setVerifyPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <span className="goTo">
        {"Already have an account? Click "}
        <Link className="link" to="/signin">
          here
        </Link>
        {" to sign in instead."}
      </span>
      <ToastContainer />
    </div>
  );
}
