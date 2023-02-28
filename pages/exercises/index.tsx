import React, { useEffect, useState } from "react";
import styles from "./Exercises.module.css";
import { ExerciseCard } from "../../src/components/ExerciseCard";
import { useExercises } from "../../src/hooks";
import LoadingIcone from "../../src/components/LoadingIcone";
import { CenteredRow } from "../../src/components/atoms/layouts";
import { SearchInput } from "../../src/components/molecules/SearchInput";
export default function Exercises() {
  const { exercises, loading, searchExercises } = useExercises();

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
        <CenteredRow
          justifyContent="flex-end"
          height="fit-content"
          width="fit-content"
        >
          <SearchInput
            action={(param) => {
              searchExercises({ name: param });
            }}
            placeholder="Pesquisar exercício..."
          />
        </CenteredRow>
      </div>
      <div className={styles.exercisesList}>
        {exercises ? (
          exercises.map((exercise) => {
            return (
              <ExerciseCard
                exercise={exercise}
                showFavoritButton={true}
                url={`/exercises/${exercise._id}`}
                key={exercise._id}
              />
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
