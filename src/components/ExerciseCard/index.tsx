
'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useUserData } from "../../hooks/useUserData";
import { THEME } from "../../theme";
import { Exercise } from "../../types";
import { Button } from "../ui/button";
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
  const router = useRouter();
  const { userData, removeFavoriteExercise, addFavoriteExercise } =
    useUserData();

  const isFavorite = userData?.favoriteExercises?.includes(exercise?._id);

  return (
    <div
      className="mx-auto flex flex-col w-64 justify-between flex-1 md:flex-grow-0 min-w-64 h-80 rounded-lg shadow-md transition-all duration-200 bg-center bg-no-repeat bg-cover m-2 relative hover:shadow-xl"
      style={{
        backgroundImage: `url(${
          exercise?.image ||
          "https://blog.livup.com.br/wp-content/uploads/2020/03/alongamento.jpg"
        })`,
      }}
    >
      <div className="flex w-full justify-end items-start space-x-2 p-2">
        {showFavoritButton && (
          <Button
            variant={"link"}
            onClick={() => {
              if (isFavorite) {
                removeFavoriteExercise(exercise?._id);
              } else {
                addFavoriteExercise(exercise?._id);
              }
            }}
          >
            <AiFillHeart
              size={30}

              className={` ${ isFavorite ? "text-destructive" : "text-accent"} hover:scale-110 transform transition-all duration-300`}
            />
          </Button>
        )}
        {showAddButton && (
          <Button
            variant={"link"}
            onClick={() => {
              addAction && addAction(exercise?._id);
            }}
          >
            <IoIosAddCircle size={30} className="text-accent hover:scale-110 transform transition-all duration-300" />
          </Button>
        )}
        {showRemoveButton && (
          <Button
            variant={"link"}
            onClick={() => {
              removeAction && removeAction(exercise?._id);
            }}
          >
            <IoIosRemoveCircle size={30} color={THEME.colors.danger} />
          </Button>
        )}
      </div>
      <div
        className="group p-4 ease-out duration-300 flex flex-col justify-center items-start w-full h-fit  pb-4  bg-gradient-to-t rounded-lg overflow-hidden cursor-pointer from-white hover:from-60% to-transparent "
        onClick={() => {
          if (!url) return;
          router.push(url);
        }}
 
      >
        <p 
          className="text-lg  font-bold text-white text-shadow mb-4"
        >{exercise?.name}</p>
        <p className="max-h-0 group-hover:max-h-fit overflow-hidden text-sm font-bold">
          {exercise?.summary.length > 250
            ? exercise?.summary.slice(0, 250) + "..."
            : exercise?.summary}
        </p>
      </div>
    </div>
  );
};
