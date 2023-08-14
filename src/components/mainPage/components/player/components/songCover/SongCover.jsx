/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import "./SongCover.css";
import { MainPageStyle } from "../../../../MainPage";

export default function SongCover({ playing, cover }) {
  const { setStyle } = useContext(MainPageStyle);

  function convertImage() {
    const data = cover.data;
    const format = cover.format;
    let base64String = "";

    for (let i = 0; i < data.length; i++)
      base64String += String.fromCharCode(data[i]);

    const d = document.querySelector(".cover-img");

    d.style.backgroundImage = `url(data:${format};base64,${window.btoa(
      base64String
    )})`;

    setStyle(`url(data:${format};base64,${window.btoa(base64String)})`);
  }

  useEffect(() => {
    if (playing) document.querySelector(".cover").classList.add("spin");
    else document.querySelector(".cover").classList.remove("spin");
  }, [playing]);

  return (
    <div className="cover spin">
      <span className="cover-img">{cover && convertImage()}</span>
    </div>
  );
}
