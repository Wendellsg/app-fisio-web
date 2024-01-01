import { useState } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaSun, FaTrash } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { TiArrowRepeat } from "react-icons/ti";
import { toast } from "react-toastify";
import { useExercise } from "../../hooks";
import { useApi } from "../../hooks/Apis";
import { Exercise, Routine } from "../../types";
import { RoutineForm } from "../RoutineForm";
import { ExerciseCard } from "../ExerciseCard";
import { IconWrapper } from "../atoms/IconWrapper";
import { Box } from "../atoms/layouts";
import { Paragraph } from "../atoms/typograph";
import { Modals } from "../molecules/modals";
import { Activities } from "../organisms/activities";
import { ActivityCardContainer } from "./styles";

export default function RoutineCard({
  routine,
  patientId,
  updateUser,
}: {
  routine: Routine;
  patientId: string;
  updateUser: () => void;
}) {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const { fisioFetcher } = useApi();
  const [showActivities, setShowActivities] = useState<boolean>(false);

  const { exercise, isLoading } = useExercise(routine.exerciseId);

  return (
    <>
      <Modals
        isOpen={!!selectedRoutine}
        onClose={() => setSelectedRoutine(null)}
      >
        <RoutineForm
          routine={selectedRoutine}
          exercise={exercise}
          onSubmit={async (editedRoutine) => {
            await fisioFetcher({
              url: `/users/${patientId}/routines/${selectedRoutine._id}`,
              method: "PATCH",
              data: {
                ...selectedRoutine,
                ...editedRoutine,
              },
              callback: () => {
                updateUser();
                setSelectedRoutine(null);
                toast.success("Rotina atualizada com sucesso");
              },
            });

            return;
          }}
        />
      </Modals>

      <Modals
        isOpen={showActivities}
        onClose={() => setShowActivities(false)}
        title={`Atividades - ${exercise?.name}`}
      >
        <Activities routine={routine} exercise={exercise} />
      </Modals>

      <ActivityCardContainer
        minWidth="310px"
        width="100%"
        justifyContent="space-between"
        display="grid"
      >
        <ExerciseCard exercise={exercise || {} as Exercise} />

        <Box
          flexDirection="column"
          justifyContent="space-between"
          padding="1rem"
          width="100%"
          flexWrap="wrap"
          gap="1rem"
          height="100%"
        >
          <Box
            flexWrap="wrap"
            gap="20px"
            height="fit-content"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box alignItems="center" gap="1rem" width="45%">
              <IconWrapper>
                <AiFillSchedule size={15} />
              </IconWrapper>
              <Paragraph
                fontWeight="bold"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {routine.frequency} por{" "}
                {routine.frequencyType.toLocaleLowerCase()}
              </Paragraph>
            </Box>
            <Box alignItems="center" gap="1rem" width="45%">
              <IconWrapper>
                <FaSun size={15} />
              </IconWrapper>
              <Paragraph
                fontWeight="bold"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Pela {routine.period.toLocaleLowerCase()}
              </Paragraph>
            </Box>
            <Box alignItems="center" gap="1rem" width="45%">
              <IconWrapper>
                <CgGym size={15} />
              </IconWrapper>
              <Paragraph
                fontWeight="bold"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {routine.series} Series
              </Paragraph>
            </Box>
            <Box alignItems="center" gap="1rem" width="45%">
              <IconWrapper>
                <TiArrowRepeat size={15} />
              </IconWrapper>

              <Paragraph
                fontWeight="bold"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {routine.repetitions} Repetições
              </Paragraph>
            </Box>
          </Box>
          <Paragraph
            style={{
              maxHeight: "70px",
              overflow: "clip",
              textOverflow: "ellipsis",
            }}
            size="sm"
            fontWeight="bold"
          >
            {routine.description}
          </Paragraph>

          <Box
            width="100%"
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection="column"
            gap="1rem"
            margin="auto 0 0 0"
          >
            <Box
              style={{
                alignSelf: "flex-end",
                justifySelf: "flex-end",
              }}
              gap="1rem"
            >
              <IconWrapper clickable onClick={() => setShowActivities(true)}>
                <MdShowChart size={15} />
              </IconWrapper>

              <IconWrapper
                onClick={() => setSelectedRoutine(routine)}
                clickable
              >
                <RiEditBoxFill size={15} />
              </IconWrapper>

              <IconWrapper clickable>
                <FaTrash size={15} />
              </IconWrapper>
            </Box>
          </Box>
        </Box>
      </ActivityCardContainer>
    </>
  );
}
