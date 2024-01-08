"use client";
import { ExerciciesForm } from "@/components/ExerciciesForm";
import { ExerciseCard } from "@/components/ExerciseCard";
import Loading from "@/components/LoadingIcon";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Select } from "@/components/molecules/Select";
import { Modals } from "@/components/molecules/modals";
import { Button } from "@/components/ui/button";
import { useExercises } from "@/hooks";
import { useUserData } from "@/hooks/useUserData";
import { Exercise } from "@/types";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

export function ExerciciesList() {
  const { exercises, isLoading, searchExercises } = useExercises();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { userData } = useUserData();
  return (
    <>
      <Modals
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title="Adicionar Exercício"
      >
        <ExerciciesForm
          onSubmit={() => setShowModal(false)}
          exercise={{} as Exercise}
        />
      </Modals>

      <div className="flex w-full justify-between min-h-fit flex-wrap md:flex-nowrap gap-2">
        <div>
          <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
            Exercícios
          </h2>
        </div>
        <div className="flex gap-4 items-center h-fit w-fil flex-wrap md:flex-nowrap">
          <Select
            placeholder="Categoria"
            options={[
              { label: "Todas", value: "all" },
              {
                label: "Pescoço",
                value: "Pescoço",
              },
              {
                label: "Cabeça",
                value: "Cabeça",
              },
              {
                label: "Perna",
                value: "Perna",
              },
            ]}
            value={selectedCategory}
            onChange={(option) => {
              setSelectedCategory(option);
            }}
            className="w-40"
          />
          <SearchInput
            action={(param) => {
              searchExercises({ name: param });
            }}
            placeholder="Pesquisar exercício..."
          />

          {userData?.isAdmin && (
            <Button variant="default" onClick={() => setShowModal(true)}>
              <BsPlus className="text-2xl font-bold" />
            </Button>
          )}
        </div>
      </div>
      <div className="justify-items-center w-full grid grid-cols-[1fr] sm:grid-cols-[repeat(auto-fill,_256px)] gap-4 py-4">
        {exercises ? (
          exercises.map((exercise) => {
            return (
              <ExerciseCard
                exercise={exercise}
                showFavoritButton={true}
                url={`/exercicios/${exercise.id}`}
                key={exercise.id}
              />
            );
          })
        ) : isLoading ? (
          <Loading />
        ) : (
          <p>Nenhum exercício encontrado</p>
        )}
      </div>
    </>
  );
}
