import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import AudioPlayer from "react-h5-audio-player";
import { useRef } from "react";

import "./Music.css";
import Track from "./Track";
const Music = () => {
  const [musics, setMusics] = useState([]);
  const token = localStorage.getItem("token");
  const [songUrl, setSongUrl] = useState(null);
  const playerRef = useRef(null);
  console.log(token);
  useEffect(() => {
    console.log("excicution started ");
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

    async function fetchWebApi(endpoint, method, body) {
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getTopTracks() {
      return await fetchWebApi("http://localhost:5001/music/music", "GET");
    }

    getTopTracks()
      .then((topTracks) => {
        // return topTracks?.map(
        //   ({ songName, songArtist }) => `${songName} by ${songArtist}`
        // );
        return topTracks;
      })
      .then((topTracks) => {
        setMusics((prev) => [...prev, ...topTracks]);
      });
  }, []);
  return (
    <div className="main-container">
      <div className="first-music">
        <div className="first-arrow">
          <div className="first-arrow-container">
            <div className="arrow">
              <MdOutlineArrowBackIosNew />
            </div>
            <div className="arrow">
              <MdOutlineArrowForwardIos />
            </div>
          </div>
          <div className="first-arrow-settings">
            <IoSettingsOutline />
          </div>
        </div>
        <div className="first-text">
          <p>Recently Added</p>
        </div>
      </div>
      <div className="second-music">
        <div className="second-text">Top Tracks</div>
        {musics.map((music, index, arr) => {
          return (
            <Track
              key={index}
              track={music}
              number={index + 1}
              songUrl={(data) => {
                console.log(" song i got now man ");
                setSongUrl(data);
              }}
              playerReference={playerRef}
            ></Track>
          );
        })}
      </div>
      {songUrl &&
        (console.log(songUrl),
        (
          <AudioPlayer
            src={songUrl}
            autoPlay
            className="my-audio-player"
            ref={playerRef}
          />
        ))}
    </div>
  );
};

export default Music;
