import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { OwnPlayer } from "../../src/components/OwnPlayer";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { useExercises, useWindowsDimensions } from "../../src/hooks";
import { Exercise } from "../../src/types";
export default function PacientePage() {
  const $videoRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.push("/exercises");
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const { width } = useWindowsDimensions();

  const { getExercise } = useExercises();

  const videoWidth = width > 768 ? 450 : width;
  const videoHeight = videoWidth * 1.44;

  useEffect(() => {
    if (id) {
      getExercise(id as string).then((data) => {
        setExercise(data);
      });
    }

    return () => {
      setExercise(null);
    };
  }, [id]);
  return (
    <Box
      width="100%"
      padding={width > 768 ? "0 2rem" : "0 0 5rem 0"}
      gap="2rem"
      flexWrap="wrap"
      overflow="auto"
      showScrollBar={width < 768}
    >
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
