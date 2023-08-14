/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import "./songDuration.css";
import { SongsContext } from "../../Player";

export default function SongDuration() {
  const { currentSong, songs } = useContext(SongsContext);

  const [audio, setAudio] = useState();
  const [duration, setDuration] = useState();
  const [time, setTime] = useState();

  const updateRef = useRef();

  function seeking() {
    let seekPostion = 0;
    if (!isNaN(audio.duration)) {
      seekPostion = audio.currentTime * (100 / audio.duration);
      updateRef.current.value = seekPostion;

      // let currentMinutes = Math.floor(audio.currentTime / 60);
      // let currentSecound = Math.floor(audio.currentTime - currentMinutes * 60);
      // let durationMinutes = Math.floor(audio.duration / 60);
      // let durationSecounds = Math.floor(audio.duration - durationMinutes * 60);

      // if (currentSecound < 10) currentSecound = 0 + currentSecound;
      // if (durationSecounds < 10) durationSecounds = 0 + durationSecounds;
      // if (currentMinutes < 10) currentMinutes = 0 + currentMinutes;
      // if (durationMinutes < 10) durationMinutes = 0 + durationMinutes;
    }
  }

  function updateSlider() {
    // it is a function the update the progress slider
    let updater = setInterval(() => {}, 1000);
    if (!audio.paused) {
      // .paused is to tell if aduio is played or not
      updater = setInterval(seeking, 1000);
    } else {
      clearInterval(updater);
    }
  }
  function seekTo() {
    // to choose the part you want to play in track
    const seekSlider = document.getElementById("seekSlider");
    let seekTo = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekTo;
  }

  useEffect(() => {
    const aud = document.getElementById("theSong");
    setAudio(aud);
  }, [currentSong, songs]);

  return (
    <div className="d-flex flex-row align-items-center my-2 range">
      {audio && updateSlider()}
      {/* <span>{time ? time : "00:00"}</span> */}
      <input
        type="range"
        id="seekSlider"
        className="songDur"
        min={1}
        max={100}
        ref={updateRef}
        defaultValue={0}
        onChange={seekTo}
      />
      {/* <span>{duration ? duration : "00:00"}</span> */}
    </div>
  );
}
