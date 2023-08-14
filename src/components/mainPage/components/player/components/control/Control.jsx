/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./control.css";

import { ImShuffle } from "react-icons/im";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {
  BsRepeat,
  BsPauseCircleFill,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import { SongsContext } from "../../Player";

export default function Control({ playing, setPlaying }) {
  const { currentSongIndex, setCurrentSongIndex, songs, setSongMetaData } =
    useContext(SongsContext);

  const [theSong, setTheSong] = useState();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  function shuffleNumber() {
    let n = parseInt(Math.random() * songs.length);

    return n;
  }

  function load(num) {
    if (songs) {
      return fetch(`${songs[num].path}`)
        .then((data) => data.arrayBuffer())
        .then((arrayBuffer) => new File([arrayBuffer], `${songs[num].name}`))
        .then((file) => {
          const jsmediatags = window.jsmediatags;
          jsmediatags.read(file, {
            onSuccess: function (tag) {
              const data = {
                title: tag.tags.title,
                artist: tag.tags.artist,
                album: tag.tags.album,
                picture: tag.tags.picture,
              };
              setSongMetaData(data);
            },
            onError: function (error) {
              console.log(error);
            },
          });
        });
    }
  }

  async function playSong(index = currentSongIndex) {
    if (!playing) setPlaying(true);

    let trackIndex = index;

    theSong.onended = () => {
      let curr = trackIndex;
      curr++;

      playSong(curr);
    };

    setCurrentSongIndex(trackIndex);
    await load(trackIndex);

    theSong.play();
  }

  function pauseSong() {
    setPlaying(false);
    if (songs) {
      theSong.pause();
    }
  }

  function nextSong() {
    if (currentSongIndex >= songs.length - 1) return;

    let n = currentSongIndex;
    setCurrentSongIndex(++n);
    if (shuffle) {
      n = shuffleNumber();
    }
    playSong(n);
  }

  function showre() {
    if (repeat) console.log("repeat");
    else console.log("don't repeat");
  }

  function prevSong() {
    if (currentSongIndex <= 0) return;

    let n = currentSongIndex;
    setCurrentSongIndex(--n);
    if (shuffle) {
      n = shuffleNumber();
    }
    playSong(n);
  }

  function shuffleSongs() {
    let state = shuffle;
    if (!state) console.log("shuffle enabled");
    else console.log("shuffle desabled");
    setShuffle((prev) => !prev);
  }

  function reapeatTrack() {
    let state = repeat;
    setRepeat((prev) => !prev);
    if (!state) console.log("shuffle enabled");
    else console.log("shuffle desabled");
  }

  useEffect(() => {
    const aud = document.getElementById("theSong");
    load(currentSongIndex);
    setTheSong(aud);
  }, [songs, currentSongIndex]);

  return (
    <div className="d-flex flex-row align-items-center control">
      <span>
        {shuffle ? (
          <ImShuffle className="text-danger" onClick={shuffleSongs} />
        ) : (
          <ImShuffle onClick={shuffleSongs} />
        )}
      </span>
      <span>
        <AiFillStepBackward onClick={prevSong} />
      </span>
      {playing && (
        <span>{playing && <BsPauseCircleFill onClick={pauseSong} />}</span>
      )}
      {!playing && (
        <span>
          <BsFillPlayCircleFill onClick={() => playSong()} />
        </span>
      )}
      <span>
        <AiFillStepForward onClick={nextSong} />
      </span>
      <span>
        {repeat ? (
          <BsRepeat className="text-danger" onClick={reapeatTrack} />
        ) : (
          <BsRepeat onClick={reapeatTrack} />
        )}
      </span>
      <span>
        {songs && currentSongIndex < songs.length && (
          <audio src={songs[currentSongIndex].path} id="theSong"></audio>
        )}
      </span>
    </div>
  );
}
