import React, { useEffect, useState } from "react";
import styles from "../../Styles/Search.module.css";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Context } from "../../Context/Context";
import { useContext } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import SongDisplay from "../Utility Components/SongDisplay";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const { user, setUser, accessToken, setAccessToken } = useContext(Context);

  function getResults(e) {
    setQuery(e.target.value);
    if (e.target.value) {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${e.target.value}&type=track&limit=50`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((data) => {
          console.log(data.data.tracks);
          setResult(data.data.tracks.items);
        })
        .catch((err) => console.log(err));
    } else {
      setResult();
    }
  }

  const songElements = result
    ? result.map((item, index) => {
        return (
          <SongDisplay
            key={item.id}
            id={item.id}
            number={index}
            image={item.album.images[0].url}
            title={item.name}
            artists={item.artists}
            album={item.album.name}
            duration={item.duration_ms}
            flag="search"
          />
        );
      })
    : "";

  return (
    <>
      <div className={styles.searchBar}>
        <input
          placeholder="Search for songs, artists, albums"
          value={query}
          onChange={(e) => getResults(e)}
          className={styles.bar}
        />
        <BsSearch className={styles.icon} onClick={getResults} />
      </div>
      {result && (
        <div className={styles.result}>
          <div className={styles.headingInfo}>
            <div className={styles.numberContainer}>
              <p className={styles.trackNoHeading}>#</p>
            </div>
            <p className={styles.trackTitleHeading}>TITLE</p>
            <p className={styles.trackAlbum}>ALBUM</p>
            <div className={styles.durationContainer}>
              <p className={styles.trackDuration}>
                <AiOutlineClockCircle />
              </p>
            </div>
          </div>
          {songElements}
        </div>
      )}
    </>
  );
};

export default Search;
