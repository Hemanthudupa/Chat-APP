import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Track.css";
import "react-h5-audio-player/lib/styles.css";

const Track = ({ track, number, songUrl: setSongURL, playerReference }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    songName: name,
    songArtist: artists,
    songUrl,
    songDuration,
    id,
  } = track;
  const trimmedName = name.split(".")[1].trim().split("_")[1];

  useEffect(() => {
    if (isPlaying) {
      console.log("Playing: ", trimmedName);
      playerReference?.current?.audio?.current?.play();
    } else {
      console.log("Paused: ", trimmedName);
      playerReference?.current?.audio?.current?.pause();
    }
  }, [isPlaying, playerReference]);

  return (
    <div
      className="track-container"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="track-number">
        {isHovered ? (
          isPlaying ? (
            <FaPause
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlay
              onClick={() => {
                setSongURL("http://localhost:5001/user/music/" + id);
                setIsPlaying(true);
              }}
            />
          )
        ) : (
          number
        )}
      </div>

      <div className="track-name">
        <div className="track-name-text">{trimmedName}</div>
        <div className="track-name-artist">
          {artists}{" "}
          <span
            style={{
              color: "green",
              fontSize: "0.8rem",
              marginLeft: "5px",
            }}
          >
            {songDuration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
