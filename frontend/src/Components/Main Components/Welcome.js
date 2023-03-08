import React from "react";
import styles from "../../Styles/Welcome.module.css";
import FeaturedPlaylists from "../Welcome Components/FeaturedPlaylists";
import GenreMix from "../Welcome Components/GenreMix";

const Welcome = () => {
  return (
    <div className={styles.welcomeContainer}>
      <h1>{new Date().getHours() >= 12 ? "Good Evening" : "Good Morning"}</h1>
      <GenreMix />
      <FeaturedPlaylists />
    </div>
  );
};

export default Welcome;

/*

Welcome message
user genre preferences
location preferences

genre wise reccomendatioms
recently releaseds

*/
