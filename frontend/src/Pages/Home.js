import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import styles from "../Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import Main from "../Components/Main";
import MusicPlayer from "../Components/MusicPlayer";
import OptionsNav from "../Components/OptionsNav";
import { Context } from "../Context/Context";
import UseAuth from "../Utilities/useAuth";

import Profile from "../Components/Profile";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const {
    user,
    setUser,
    code,
    setCode,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
    setUserPlaylists,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("In effect 1");
    const token = localStorage.getItem("token");
    Axios.get("http://localhost:5000/me", {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((data) => {
        console.log(data.data._id);
        setUser(data.data);
        setAuthenticated(true);

        console.log(new URLSearchParams(window.location.search).get("code"));
          setCode(new URLSearchParams(window.location.search).get("code"));

        //Get Token from Backend
      })
      .catch((err) => {
        console.log(err);
        setAuthenticated(false);
        if (err.response.status === 401 || err.response.status === 400)
          navigate("/");
      });
  }, [code]);

  // useEffect(() => {
  //   // if(!code) return
  //   console.log("In effect 2");
  //   setAccessToken(
  //     "BQBZ7DZRqRtBD6lSpynXlk5znUddvYHH-MIMGlbOqqViTQMuPRGFgqT9oDx5blu0AuKLYn35emuZqpj6jPQEC-xfXMUViP1hWKu0X1IVD7NBXfh_sSqfDwtVc85G2k9qmZ93sfHOWmh48DjFkHdUPfeGiyqYA2F8AdC7fLJ4UEvg-T6a5wCNaZHvd3IrKLJ39VcPUd5b_eRP0NR7jNjZhTTH"
  //   );
  //   // Axios.post("http://localhost:5000/token", {
  //   //   code
  //   // })
  //   //   .then((res) => {
  //   //     console.log("Code: ", code);
  //   //     console.log(res);
  //   //     // setAccessToken(res.data.accessToken);
  //   //     setRefreshToken(res.data.refreshToken);
  //   //     setExpiresIn(res.data.expiresIn);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err)
  //   //     window.location = "/";
  //   //   });
  // }, [code]);

  return (
    <>
      <div className={styles.home}>
        <Main />

        <Profile />
        <OptionsNav />
        <MusicPlayer />
        <UseAuth/>
      </div>
    </>
  );
};

export default Home;
