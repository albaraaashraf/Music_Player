/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

import "./player.css";
import SongCover from "./components/songCover/SongCover";
import SongName from "./components/songName/SongName";
import Artist from "./components/Artist/Artist";
import SongDuration from "./components/songDuration/SongDuration";
import Volum from "./components/volum/Volum";
import Control from "./components/control/Control";

import aud from "/src/assets/music/data.json";

export const SongsContext = createContext();

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState();
  const [songMetaData, setSongMetaData] = useState();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const value = {
    songs,
    currentSongIndex,
    songMetaData,

    setSongMetaData,
    setCurrentSongIndex,
  };

  useEffect(() => {
    setSongs(() => loadsongs());
  }, []);

  return (
    <div className="d-flex flex-column  align-items-center player">
      <SongsContext.Provider value={value}>
        {songs ? (
          <span style={{ fontWeight: "bold" }}>
            Playing {currentSongIndex + 1} of {songs.length}
          </span>
        ) : (
          <span>no songs</span>
        )}
        <div className="w-100 h-100 d-flex flex-column justfyn-content-center align-items-center">
          <div className="row">
            <div className="col">
              <SongCover
                playing={playing}
                cover={songMetaData && songMetaData.picture}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <SongName
                name={songMetaData ? songMetaData.title : "song name"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Artist
                artist={songMetaData ? songMetaData.artist : "song artist"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <SongDuration />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Volum />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Control playing={playing} setPlaying={setPlaying} />
            </div>
          </div>
        </div>
      </SongsContext.Provider>
    </div>
  );
}

function loadsongs() {
  let songs = [];
  for (let i = 0; i < aud.music.length; i++) {
    songs.push(aud.music[i]);
  }

  return songs;
}
