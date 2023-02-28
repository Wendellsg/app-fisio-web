import { AiFillHeart } from "react-icons/ai";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useRouter } from "next/router";
import * as S from "./styles";
import { useState } from "react";
import { ThemeColors } from "../../theme/colors";
import { Exercise } from "../../types";
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
  const [favorits, setFavorits] = useState([]);
  const [showInfos, setShowInfos] = useState(false);
  const router = useRouter();
  function findFavorits(id: string) {
    const find = favorits.find((favorit) => favorit._id === id);
    if (find) {
      return ThemeColors.danger;
    } else {
      return "#fff";
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
    >
      <S.ExerciseCardTools>
        {showFavoritButton && (
          <S.ToolIcon
            onClick={() => {
              const find = favorits.find(
                (favorit) => favorit._id === exercise._id
              );
              if (find) {
                setFavorits(
                  favorits.filter((favorit) => favorit._id !== exercise._id)
                );
              } else {
                setFavorits([...favorits, exercise]);
              }
            }}
          >
            <AiFillHeart size={30} color={findFavorits(exercise._id)} />
          </S.ToolIcon>
        )}
        {showAddButton && (
          <S.ToolIcon
            onClick={() => {
              addAction && addAction(exercise._id);
            }}
          >
            <IoIosAddCircle size={30} color={ThemeColors.primary} />
          </S.ToolIcon>
        )}
        {showRemoveButton && (
          <S.ToolIcon
            onClick={() => {
              removeAction && removeAction(exercise._id);
            }}
          >
            <IoIosRemoveCircle size={30} color={ThemeColors.danger} />
          </S.ToolIcon>
        )}
      </S.ExerciseCardTools>
      <S.ExerciseCardInfos
        onClick={() => {
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
