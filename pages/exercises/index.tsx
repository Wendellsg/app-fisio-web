import React, { useEffect, useState } from "react";
import styles from "./Exercises.module.css";
import ExerciseCard from "../../src/components/ExerciseCard";
import { useExercises } from "../../src/hooks";
import LoadingIcone from "../../src/components/LoadingIcone";
import Link from "next/link";
export default function Exercises() {
  const { exercises, loading } = useExercises();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  return (
    <div className={styles.Container}>
      <h2>Exercícios</h2>
      <div className={styles.exercisesSearchContainer}>
        <div className={styles.exercisesSearchFilters}>
          <div className={styles.exercisesSearchFilter}>
            <p>Categoria</p>
            <select>
              <option>Pescoço</option>
              <option>Cabeça</option>
              <option>Perna</option>
            </select>
          </div>
          <div className={styles.exercisesSearchFilter}>
            <p>Membro</p>
            <select>
              <option>Pescoço</option>
              <option>Cabeça</option>
              <option>Perna</option>
            </select>
          </div>
        </div>
        <div className={styles.exercisesSearchButtonContainer}>
          <div className={styles.exercisesInputSearch}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="ScalableButton">
            <img
              src="/assets/search.png"
              className={styles.exercisesSearchicone}
            />
          </div>
        </div>
      </div>
      <div className={styles.exercisesList}>
        {exercises ? (
          exercises.map((exercise) => {
            return (
              <Link
                href={`/exercises/${exercise._id}`}
                key={exercise._id}
                passHref={false}
              >
                <a>
                  <ExerciseCard exercise={exercise} showFavoritButton={true} />
                </a>
              </Link>
            );
          })
        ) : loading ? (
          <LoadingIcone />
        ) : (
          <div>Nenhum exercício encontrado</div>
        )}
      </div>
    </div>
  );
}
