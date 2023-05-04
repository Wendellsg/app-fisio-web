import { useRouter } from "next/router";
import styles from "./Exercise.module.css";
import { useEffect, useRef, useState } from "react";
import { OwnPlayer } from "../../src/components/OwnPlayer";
export default function PacientePage() {
  const $videoRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.push("/exercises");

  return (
    <div className={styles.ExerciseContainer}>
      <div className={styles.PlayerWrapper}>
        <video
          className={styles.Player}
          ref={$videoRef}
          poster={"/assets/atictivityimage.png"}
          src="https://vjs.zencdn.net/v/oceans.mp4"
        />
        <OwnPlayer
          $videoRef={$videoRef}
          goBack={goBack}
          videoName={"exercicio legal"}
        />
      </div>
      <main className={styles.ExerciseContent}>
        <h1>Resumo</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore...
        </p>
        <h1>Instruções</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore...
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore...
        </p>
      </main>
    </div>
  );
}
