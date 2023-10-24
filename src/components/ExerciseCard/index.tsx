import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useUserData } from "../../hooks/useUserData";
import { THEME } from "../../theme";
import { Exercise } from "../../types";
import * as S from "./styles";
export const ExerciseCard: React.FC<{
  exercise: Exercise;
  showFavoritButton?: boolean;
  url?: string;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  addAction?: (id: string) => void;
  removeAction?: (id: string) => void;
}> = ({
  exercise,
  url,
  showFavoritButton,
  showAddButton,
  showRemoveButton,
  addAction,
  removeAction,
}) => {
  const [showInfos, setShowInfos] = useState(false);
  const router = useRouter();
  const { userData, removeFavoriteExercise, addFavoriteExercise } =
    useUserData();

  const isFavorite = userData?.favoriteExercises?.includes(exercise._id);

  return (
    <S.ExerciseCard
      style={{
        backgroundImage: `url(${
          exercise.image ||
          "https://blog.livup.com.br/wp-content/uploads/2020/03/alongamento.jpg"
        })`,
      }}
    >
      <S.ExerciseCardTools>
        {showFavoritButton && (
          <S.ToolIcon
            onClick={() => {
              if (isFavorite) {
                removeFavoriteExercise(exercise._id);
              } else {
                addFavoriteExercise(exercise._id);
              }
            }}
          >
            <AiFillHeart
              size={30}
              color={isFavorite ? THEME.colors.danger : "#FFF"}
            />
          </S.ToolIcon>
        )}
        {showAddButton && (
          <S.ToolIcon
            onClick={() => {
              addAction && addAction(exercise._id);
            }}
          >
            <IoIosAddCircle size={30} color={THEME.colors.primary} />
          </S.ToolIcon>
        )}
        {showRemoveButton && (
          <S.ToolIcon
            onClick={() => {
              removeAction && removeAction(exercise._id);
            }}
          >
            <IoIosRemoveCircle size={30} color={THEME.colors.danger} />
          </S.ToolIcon>
        )}
      </S.ExerciseCardTools>
      <S.ExerciseCardInfos
        onClick={() => {
          if (!url) return;
          router.push(url);
        }}
        onMouseEnter={() => {
          setShowInfos(true);
        }}
        onMouseLeave={() => {
          setShowInfos(false);
        }}
      >
        <S.ExerciseName>{exercise.name}</S.ExerciseName>
        <S.ExerciseSummary show={showInfos}>
          {exercise.summary.length > 250
            ? exercise.summary.slice(0, 250) + "..."
            : exercise.summary}
        </S.ExerciseSummary>
      </S.ExerciseCardInfos>
    </S.ExerciseCard>
  );
};
