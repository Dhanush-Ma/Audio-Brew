import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Context } from "../Context/Context";

export default function useAuth() {
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
    code
  } = useContext(Context);

  useEffect(() => {
    console.log("in token effect")
    //if(!code) return
    Axios.post("http://localhost:5000/token", {
      code: code,
    })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        window.location = "/";
        console.log(err)
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      Axios.post("http://localhost:5000/refresh", {
        refreshToken,
      })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return <></>
}
