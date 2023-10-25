import { useState } from "react";
import styled from "styled-components";
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

const ExercisesScroll = styled(Box)`
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
`;

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

  const { userData } = useUserData();

  return (
    <Box flexDirection="column" width="100%" gap="1rem" padding="2rem">
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

      <Box width="100%" justifyContent="space-between" minHeight="fit-content">
        <Box gap="1rem"></Box>
        <Box
          justifyContent="flex-end"
          alignItems="flex-end"
          height="fit-content"
          width="fit-content"
          gap="1rem"
          flexWrap="wrap"
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
      <ExercisesScroll flexWrap="wrap" gap="1rem" justifyContent="center">
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
      </ExercisesScroll>
    </Box>
  );
}
