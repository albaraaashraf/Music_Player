import React, { useContext, useEffect, useState } from "react";
import "./volum.css";
import { BsVolumeDownFill, BsFillVolumeUpFill } from "react-icons/bs";

import { SongsContext } from "../../Player";
export default function Volum() {
  const { currentSong, songs } = useContext(SongsContext);

  const [audio, setAudio] = useState();

  function setVolum() {
    const vol = document.getElementById("vol");
    audio.volume = vol.value / 100;
  }

  useEffect(() => {
    const aud = document.getElementById("theSong");

    setAudio(aud);
  }, [currentSong, songs]);

  return (
    <div className="d-flex flex-row align-items-center my-2 range">
      <span>
        <BsVolumeDownFill />
      </span>
      <input type="range" id="vol" min={1} max={100} onChange={setVolum} />
      <span>
        <BsFillVolumeUpFill />
      </span>
    </div>
  );
}
