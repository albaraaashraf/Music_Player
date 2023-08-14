/* eslint-disable no-unused-vars */
import React from "react";
import "./songname.css";

export default function SongName(probs) {
  return (
    <>
      <div className="songName">{probs.name}</div>
    </>
  );
}
