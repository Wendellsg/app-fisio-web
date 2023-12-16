import { useRouter } from "next/router";
import { useState } from "react";
import { ExerciciesForm } from "../../src/components/ExerciciesForm";
import { VideoPlayer } from "../../src/components/OwnPlayer";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { Modals } from "../../src/components/molecules/modals";
import { useExercise, useExercises } from "../../src/hooks";
import { useUserData } from "../../src/hooks/useUserData";
export default function PacientePage() {
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.push("/exercises");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { userData } = useUserData();

  const { exercise, isLoading } = useExercise(id as string);
  const { deleteExercise } = useExercises();

  return (
    <Box width="100%" gap="2rem" flexWrap="wrap" overflow="auto">
      <Modals
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar exercício"
      >
        <Box width="600px" padding="2rem">
          <ExerciciesForm
            onSubmit={() => setShowEditModal(false)}
            exercise={exercise}
          />
        </Box>
      </Modals>

      <VideoPlayer
        goBack={goBack}
        name={exercise?.name}
        video={exercise?.video}
        image={exercise?.image}
      />

      <Box
        flexDirection="column"
        gap="1rem"
        padding="2rem"
        style={{
          flex: 1,
        }}
      >
        {userData?.isAdmin && (
          <Box width="100%" gap="1rem" justifyContent="flex-end">
            <DefaultButton
              onClick={() => setShowEditModal(true)}
              text="Editar"
              type="neutral"
            />

            <DefaultButton
              onClick={async () => {
                await deleteExercise(id as string);

                router.push("/exercises");
              }}
              text="Excluir"
              type="negation"
              confirmation
            />
          </Box>
        )}
        <Title fontWeight="bold" size="xl">
          {exercise?.name}
        </Title>
        <Paragraph fontWeight="bold" size="lg">
          Resumo
        </Paragraph>
        <Paragraph>{exercise?.summary}</Paragraph>
        <Paragraph fontWeight="bold" size="lg">
          Instruções
        </Paragraph>
        <Paragraph>{exercise?.description}</Paragraph>
      </Box>
    </Box>
  );
}
