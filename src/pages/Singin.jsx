import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./Signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Singin = () => {
    const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [hassError , setHasError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");

  const [password, setPassword] = useState("");
    useEffect(() => {
      {
        user && navigate("/");
      }
    }, [user]);
    
  return (
    <>
      <Helmet>
        <meta name="description" content="the page of sign in" />
        <link rel="icon" type="image/png" href="./public/suit.png" />
        <title>sign in Page</title>
      </Helmet>
      <Header />
      {/* Main content */}
      <main>
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                placeholder="Password"
              />
              <a href="#">Forgot your password?</a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //sign in
                  signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      // Signed in
                      const user = userCredential.user;
                      // ...
                      navigate("/");
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setHasError(true)
                      switch (errorCode) {
                        case "auth/invalid-email":
                          setErrorMsg("wrong email");
                          break;

                        case "auth/missing-password":
                          setErrorMsg("password empty");
                          break;

                        case "auth/user-not-found":
                          setErrorMsg("wrong email");
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
                    });
                }}
              >
                Sign In
              </button>
              {hassError && <p style={{ color: "red" }}>{errorMsg}</p> }
              
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <NavLink className="ghost" to="/signUp">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Singin;
