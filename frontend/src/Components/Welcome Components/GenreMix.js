import Axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Context/Context";
import styles from "../../Styles/GenreMix.module.css";
import { IoAlbums } from "react-icons/io5";
import Card from "./Card";

const GenreMix = () => {
  const { user, accessToken } = useContext(Context);

  return (
    <div className={styles.genreMixContainer}>
      <h4>Your Genre Mix</h4>
      <div className={styles.cardContainer}>
        {user.preferences &&
          user.preferences.map((pref, index) => {
            return (
              <Card
                key={index}
                title={`${pref} Mix`}
                link={`/AudioBrew/playlist/${pref}`}
                img={<IoAlbums />}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GenreMix;
