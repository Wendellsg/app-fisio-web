import { useRouter } from "next/router";
import { useState } from "react";
import { ExerciciesForm } from "../../src/components/ExerciciesForm";
import { ExerciseCard } from "../../src/components/ExerciseCard";
import LoadingIcone from "../../src/components/LoadingIcone";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Box } from "../../src/components/atoms/layouts";
import { HilightedText, Paragraph } from "../../src/components/atoms/typograph";
import { SearchInput } from "../../src/components/molecules/SearchInput";
import { Select } from "../../src/components/molecules/Select";
import { Modals } from "../../src/components/molecules/modals";
import { useExercises } from "../../src/hooks";
import { useUserData } from "../../src/hooks/useUserData";
export default function Exercises() {
  const { exercises, loading, searchExercises } = useExercises();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    value: string;
  }>({
    label: "Todas",
    value: "all",
  });
  const router = useRouter();

  const { userData } = useUserData();

  return (
    <Box
      flexDirection="column"
      width="100%"
      gap="1rem"
      overflow="auto"
      padding="1rem"
    >
      <HilightedText size="medium">Exercícios</HilightedText>
      <Modals
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title="Adicionar Exercício"
      >
        <Box width="600px" padding="2rem">
          <ExerciciesForm onSubmit={() => setShowModal(false)} />
        </Box>
      </Modals>

      <Box width="100%" justifyContent="space-between" margin="2rem 0 0 0">
        <Box gap="1rem"></Box>
        <Box
          justifyContent="flex-end"
          alignItems="flex-end"
          height="fit-content"
          width="fit-content"
          gap="1rem"
        >
          <Select
            label="Categoria"
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
            width="150px"
            minWidth="150px"
          />
          <SearchInput
            action={(param) => {
              searchExercises({ name: param });
            }}
            placeholder="Pesquisar exercício..."
          />

          {userData?.isAdmin && (
            <AddButton onClick={() => setShowModal(true)} />
          )}
        </Box>
      </Box>
      <Box margin="2rem 0" flexWrap="wrap" gap="1rem">
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
          <Paragraph>Nenhum exercício encontrado</Paragraph>
        )}
      </Box>
    </Box>
  );
}
