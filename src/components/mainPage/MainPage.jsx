/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import "./MainPage.css";

import Player from "/src/components/mainPage/components/player/Player";

export const MainPageStyle = createContext();

export default function MainPage() {
  const [style, setStyle] = useState(
    "url(https://cdn.arstechnica.net/wp-content/uploads/2023/05/beatles_hero_1-800x450.jpg)"
  );

  return (
    <div className="contcont">
      <div className="cont" style={{ backgroundImage: `${style}` }}></div>
      <MainPageStyle.Provider value={{ setStyle }}>
        <div className="playerContianer">
          <Player />
        </div>
      </MainPageStyle.Provider>
    </div>
  );
}
