/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
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

  // to use it inside some functions
  //// as setState is async function
  const repeattRef = useRef();
  const shuffletRef = useRef();

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

      if (shuffletRef.current) curr = shuffleNumber();
      if (repeattRef.current) curr;
      else curr++;

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
    shuffletRef.current = !state;
    // if (!state) console.log("shuffle enabled");
    // else console.log("shuffle desabled");
    setShuffle((prev) => !prev);
  }

  function reapeatTrack() {
    let state = repeat;
    setRepeat((prev) => !prev);
    repeattRef.current = !state;
    // if (repeattRef.current)
    //   console.log("repeattRef.current enabled", repeattRef.current);
    // else console.log("repeattRef.current desabled", repeattRef.current);
  }

  useEffect(() => {
    const aud = document.getElementById("theSong");
    load(currentSongIndex);
    setTheSong(aud);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
