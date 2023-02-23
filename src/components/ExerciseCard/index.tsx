import styles from "./ExecisesCard.module.css";
import { AiFillHeart } from "react-icons/ai";
import * as S from "./styles";
export default function ExerciseCard({ exercise, showFavoritButton }) {
  const favorits = [
    {
      id: "62520061380ce1b28e942308",
    },
    {
      id: "625585667701280c494c85bc",
    },
    {
      id: "6255868d4317e2ede5d9f8cd",
    },
  ];
  function findFavorits(id: string) {
    const find = favorits.find((favorit) => favorit.id === id);
    if (find) {
      return "red";
    } else {
      return "white";
    }
  }
  return (
    <S.ExerciseCard
      style={{
        backgroundImage: `url(${
          exercise.image ||
          "https://blog.livup.com.br/wp-content/uploads/2020/03/alongamento.jpg"
        })`,
      }}
      key={exercise.name}
    >
      {showFavoritButton && <AiFillHeart color={findFavorits(exercise.id)} />}

      <S.ExerciseCardInfos>
        <S.ExerciseName>{exercise.name}</S.ExerciseName>
        <S.ExerciseSummary>{exercise.summary}</S.ExerciseSummary>
      </S.ExerciseCardInfos>
    </S.ExerciseCard>
  );
}
