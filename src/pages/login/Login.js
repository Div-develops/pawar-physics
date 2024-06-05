import React, { useState } from "react";
import "./login.css";
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import loginicon from "../../assests/loginicon.jpg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const auth = getAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // Success...
        console.log(user);
        navigate('/')
        //...
      })
      .catch((error) => {
        console.error("Sign-In error:", error);

        let errorMessage = "An error occurred during sign-in. Please try again later.";

        if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/user-disabled") {
          errorMessage = "This account has been disabled. Please contact support.";
        } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          errorMessage = "Invalid email or password. Please check your credentials.";
        }
        // Handle more error codes here...

        setMessage(errorMessage);
      });

  }


  return (
    <div className="login">
      <div className="flex-login-container">
          <img
            src={loginicon}
            width="120px"
            height="120px"
            className="iconlogo"
        />
        <div className="title-pawar-physics">Pawar Physics</div>

          <div className="form">
            <div className="field">
              <p className="label">Email </p>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="Enter your email address"
                name="email"
                value={email}
                autoComplete="Off"
                onChange={(e) => {
                setEmail(e.target.value)
                }}
                className="input-container"
              />
            </div>
            <div className="field">
              <p className="label">Password </p>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                autoComplete="Off"
                aria-autocomplete="false"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => {
                setPassword(e.target.value)
                }}
                className="input-container"
              />
            </div>

            {message != "" ? (
              <div className="error-text">{message}</div>
            ) : null}

            <div className="div-center">
              <button
                className="button-container"
                onClick={(e) => {
                  handleSignIn(e)
                }}
              >
                Login
            </button>
            
          </div>
         
        </div>
        <div className="forgot-pw-un" style={{marginTop:"5px"}}>
          Forgot <span style={{ color: "#000", cursor: "pointer" }} >Username/Password?</span>
        </div>
        <div className="forgot-pw-un" onClick={() => navigate("/signup")}>
          Don't have an account?<span style={{ color: "#000" ,cursor:"pointer"}} >Sign Up</span>
        </div>
        </div>
      </div>

  );
}

export default Login;
