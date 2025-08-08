import { React, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { format, formatDistanceToNow } from "date-fns";
import { arSA } from "date-fns/locale"; // Import Arabic locale
import { enUS } from "date-fns/locale";
import LoadingSpinner from "./LoadingPage";
import Error from "../components/Error";
import { deleteUser } from "firebase/auth";
import "./Profile.css";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    {
      !user && !loading && navigate("/signin");
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    if(!user.emailVerified){
      navigate("/")
    }else{
      return (
      <>
        <Helmet>
          <meta name="description" content="the page of Profile codes" />
          <link rel="icon" type="image/png" href="./public/suit.png" />
          <title>Profile Page</title>
        </Helmet>

        <>
          <Header />
          {/* Main content */}

          <main className="profile">
            <ul>
              <li>UserName : {user.displayName}</li>
              <li>email : {user.email}</li>
              <li>
                Last SignIn :{" "}
                {formatDistanceToNow(user.metadata.lastSignInTime, {
                  addSuffix: true,
                  locale: enUS,
                })}
              </li>
              <li>
                Created from :{" "}
                {formatDistanceToNow(user.metadata.creationTime, {
                  addSuffix: true,
                  locale: arSA,
                })}
              </li>
            </ul>
            <button
              onClick={() => {
                deleteUser(user)
                  .then(() => {
                    // User deleted.
                    navigate("./");
                  })
                  .catch((error) => {
                    // An error ocurred
                    // ...
                  });
              }}
            >
              delete account
            </button>
          </main>
          {/* Footer */}
          <Footer />
        </>

        {error && <Error />}
      </>
    );
    }
    
  }
};

export default Profile;
