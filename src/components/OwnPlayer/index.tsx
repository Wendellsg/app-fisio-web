import { useEffect, useRef, useState } from "react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";
import { THEME } from "../../theme";
import { ProgressBar } from "../atoms/ProgressBar";
import styles from "./OwnPlayer.module.css";

export type VideoPlayerProps = {
  goBack?: () => void;
  videoName?: string;
  name: string;
  video: string;
  image: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  goBack,
  videoName,
  video,
  image,
  ...props
}) => {
  const $videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    if (Player) {
      Player.onended = () => {
        Player.currentTime = 0;
        Player.pause();
      };
    }
  }, [Player]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (Player) {
      interval = setInterval(() => {
        setCurrentTime(Player.currentTime);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [Player]);

  const fixTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <VideoPlayerContainer
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      {...props}
    >
      <video
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          objectFit: "cover",
        }}
        ref={$videoRef}
        poster={image}
        src={video}
      />

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

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {!playing ? (
            <AiOutlinePlayCircle
              size={50}
              color={THEME.colors.primary}
              style={{
                cursor: "pointer",
              }}
              onClick={() => [Player?.play()]}
            />
          ) : (
            <AiOutlinePauseCircle
              size={50}
              color={THEME.colors.primary}
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
    </VideoPlayerContainer>
  );
};

const VideoPlayerContainer = styled.div`
  height: auto;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  max-width: 100vw;

  @media (min-width: 980px) {
    border-radius: 10px;
    max-width: 600px;
  }
`;
