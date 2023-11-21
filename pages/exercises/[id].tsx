import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { ExerciciesForm } from "../../src/components/ExerciciesForm";
import { OwnPlayer } from "../../src/components/OwnPlayer";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { Modals } from "../../src/components/molecules/modals";
import {
  useExercise,
  useExercises,
  useWindowsDimensions,
} from "../../src/hooks";
import { useUserData } from "../../src/hooks/useUserData";
export default function PacientePage() {
  const $videoRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.push("/exercises");
  const { width } = useWindowsDimensions();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { userData } = useUserData();

  const { exercise, isLoading } = useExercise(id as string);
  const { deleteExercise } = useExercises();

  const videoWidth = width > 768 ? 450 : width;
  const videoHeight = videoWidth * 1.44;

  return (
    <Box
      width="100%"
      padding={width > 768 ? "0 2rem" : "0 0 5rem 0"}
      gap="2rem"
      flexWrap="wrap"
      overflow="auto"
      showScrollBar={width < 768}
    >
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

      <Box
        width={videoWidth + "px"}
        height={videoHeight + "px"}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
        borderRadius="10px"
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            objectFit: "cover",
          }}
          ref={$videoRef}
          poster={exercise?.image}
          src={exercise?.video}
        />
        <OwnPlayer
          $videoRef={$videoRef}
          goBack={goBack}
          videoName={exercise?.name}
        />
      </Box>
      <Box
        flexDirection="column"
        gap="1rem"
        width={width > 1200 ? `calc(100% - ${videoWidth}px - 2rem)` : "100%"}
        padding="1rem"
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
