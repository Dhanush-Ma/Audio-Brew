import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import SongDisplay from "./Utility Components/SongDisplay";
import styles from "../Styles/Search.module.css";
import stylesPlaylist from "../Styles/Playlist.module.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { BsFillPlayCircleFill } from "react-icons/bs";
import getDuration from "../Utilities/getDuration";

const AudioBrewPlaylist = () => {
  const { id } = useParams();
  const { userPlaylists, setUserPlaylists, user, accessToken, setMountModal } =
    useContext(Context);
  console.log(userPlaylists);
  const [result, setResult] = useState();
  const navigate = useNavigate();
  const playPlaylistSongs = () => {};

  useEffect(() => {
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/recommendations?seed_genres=${id}&limit=100`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        setResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(result);
  return (
    <>
      {result && (
        <>
          <div className={stylesPlaylist.playlistInfo}>
            <div className={stylesPlaylist.imgContainer}>
              <RiPlayList2Fill className={stylesPlaylist.playlistIcon} />
            </div>
            <div className={stylesPlaylist.playlistDetails}>
              <p
                className={stylesPlaylist.playlistName}
                style={{ textTransform: "capitalize" }}
              >{`${id} Mix`}</p>
              <div>
                <p className={stylesPlaylist.playlistTracksDetails}>
                  {`${result.tracks.length} songs `} &#183;{" "}
                  {getDuration(
                    result.tracks.reduce((acc, cur) => {
                      return acc + cur.duration_ms;
                    }, 0)
                  )
                    .split(":")
                    .join(" mins ")}{" "}
                  secs
                </p>
              </div>
            </div>
          </div>
          <div className={stylesPlaylist.icons}>
            <BsFillPlayCircleFill
              className={stylesPlaylist.heartIcon}
              color="#1df549"
              onClick={playPlaylistSongs}
            />
          </div>
        </>
      )}

      <div className={stylesPlaylist.playlistTracks}>
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
            {result.tracks.map(
              (item, index) =>
                item.id && (
                  <SongDisplay
                    key={item.id}
                    id={item.id}
                    number={index}
                    image={item.album.images[0] ? item.album.images[0].url : ""}
                    title={item.name}
                    artists={item.artists}
                    album={item.album.name}
                    duration={item.duration_ms}
                    flag="search"
                  />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AudioBrewPlaylist;
