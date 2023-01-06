import styles from "./OwnPlayer.module.css";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
export default function OwnPlayer({ $videoRef, goBack, exerciceId }) {
  const Player = $videoRef.current;
  const playing = !Player?.paused;
  const [playerPressed, setPlayerPressed] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log("playing", playing);
    if (playing) {
      setPlayerPressed(false);
    }
  }, [playing]);

  useEffect(() => {
    console.log("component mont", playing);
    onTimeUpdate();

    return () => {
      Player?.pause();
      console.log("component unmount", playing);
    };
  }, []);

  function onTimeUpdate() {
    if (!Player) return;
    Player.ontimeupdate = () => {
      setCurrentTime(Player.currentTime);
    };
  }

  const fixTime = (time) => {
    if (!time || isNaN(time)) return "00";
    let fixedTime = Math.floor(time).toString();
    return fixedTime;
  };

  return (
    <div
      className={`${styles.OwnPlayerContainer} ${
        !playerPressed ? "fadeOut" : "show"
      }`}
      onClick={() => [setPlayerPressed(!playerPressed)]}
    >
      <div style={{ width: "100%", display: "flex" }}>
        <IoMdArrowBack size={50} color={"#96FFB3"} onClick={() => goBack()} />
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {!playing ? (
          <AiOutlinePlayCircle
            size={50}
            color={"#96FFB3"}
            onClick={() => [Player?.play()]}
          />
        ) : (
          <AiOutlinePauseCircle
            size={50}
            color={"#96FFB3"}
            onClick={() => [Player?.pause()]}
          />
        )}
      </div>
      <div className={styles.OwnPlayerFooter}>
        <h2 className={styles.OwnPlayerContainerTitle}>
          Agachamento bilateral
        </h2>
        <span className={styles.OwnPlayerTimer}>{`${fixTime(
          currentTime
        )} / ${fixTime(Player?.duration)}`}</span>
      </div>
    </div>
  );
}
