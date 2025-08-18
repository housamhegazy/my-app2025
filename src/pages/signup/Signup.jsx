import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";
import "./Signup.css";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../loading/LoadingPage";
// import { getAuth, sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hassError, setHasError] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    {
      user && navigate("/");
    }
  });

  //signup function
  const SignUpFunc = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        //send username
        updateProfile(auth.currentUser, {
          displayName: username,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // Profile updated!
            // ...
            navigate("/");
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setHasError(true);
        console.log(errorCode);
        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMsg("wrong email");
            break;

          case "auth/missing-password":
            setErrorMsg("password empty");
            break;

          case "auth/email-already-in-use":
            setErrorMsg(" email already in use");
            break;

          case "auth/wrong-password":
            setErrorMsg("wrong password");
            break;

          case "auth/invalid-credential":
            setErrorMsg("incorrect email or password");
            break;

          case "auth/too-many-requests":
            setErrorMsg("you can sign in after 2 minutes");
            break;

          default:
            setErrorMsg(errorCode);
        }
        // ..
      });
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <meta name="description" content="the page of sign up" />
          <link rel="icon" type="image/png" href="./public/suit.png" />
          <title>sign up Page</title>
        </Helmet>
        <Header />
        {/* Main content */}

        <div className="signup-container">
          <form className="signup-form">
            <h2>Create Account</h2>
            <p className="form-description">
              Please fill in the details below to get started.
            </p>

            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                id="username"
                name="username"
                placeholder="housamhegazy"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Enter a secure password"
                required
              />
            </div>
            <button
              onClick={(e) => {
                SignUpFunc(e);
              }}
              type="submit"
              className="submit-btn"
            >
              Sign Up
            </button>
            {hassError && <p>{errorMsg}</p>}

            <p className="login-link">
              Already have an account? <a href="/signin">Log In</a>
            </p>
          </form>
        </div>
        {/* Footer */}
        <Footer />
      </>
    );
  }
};

export default Signup;
