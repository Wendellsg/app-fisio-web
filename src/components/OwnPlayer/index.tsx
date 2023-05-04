import styles from "./OwnPlayer.module.css";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { ProgressBar } from "../atoms/ProgressBar";
export const OwnPlayer: React.FC<{
  $videoRef: React.MutableRefObject<HTMLVideoElement>;
  goBack?: () => void;
  videoName?: string;
}> = ({ $videoRef, goBack, videoName }) => {
  const Player = $videoRef.current;
  const playing = !Player?.paused;
  const [playerPressed, setPlayerPressed] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (playing) {
      setPlayerPressed(false);
    }
  }, [playing]);

  useEffect(() => {
    onTimeUpdate();

    return () => {
      Player?.pause();
    };
  }, []);

  function onTimeUpdate() {
    if (!Player) return;
    Player.ontimeupdate = () => {
      setCurrentTime(Player.currentTime);
    };
  }

  const fixTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className={`${styles.OwnPlayerContainer} ${
        !playerPressed ? "fadeOut" : "show"
      }`}
      onClick={() => [setPlayerPressed(!playerPressed)]}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {goBack && (
          <IoMdArrowBack
            size={30}
            color={"#96FFB3"}
            onClick={() => goBack()}
            style={{
              cursor: "pointer",
            }}
          />
        )}
        {videoName && (
          <h2 className={styles.OwnPlayerContainerTitle}>{videoName}</h2>
        )}
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {!playing ? (
          <AiOutlinePlayCircle
            size={50}
            color={"#96FFB3"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => [Player?.play()]}
          />
        ) : (
          <AiOutlinePauseCircle
            size={50}
            color={"#96FFB3"}
            onClick={() => [Player?.pause()]}
            style={{
              cursor: "pointer",
            }}
          />
        )}
      </div>
      <div className={styles.OwnPlayerFooter}>
        <div className={styles.OwnPlayerTimer}>{fixTime(currentTime)}</div>
        <ProgressBar
          progress={(currentTime / Player?.duration) * 100}
          width={"100%"}
          height={"5px"}
          borderRadius={"5px"}
          onSeek={(percentage) => {
            Player.currentTime = (percentage / 100) * Player?.duration;
          }}
        />
        <div className={styles.OwnPlayerTimer}>
          {fixTime(Player?.duration || 0)}
        </div>
      </div>
    </div>
  );
};
