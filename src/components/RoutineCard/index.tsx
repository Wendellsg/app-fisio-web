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
import { Routine } from "../../types";
import { RoutineForm } from "../ActivityForm";
import { IconWrapper } from "../atoms/IconWrapper";
import { Box } from "../atoms/layouts";
import { Paragraph, Title } from "../atoms/typograph";
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

  const { exercise, isFetching } = useExercise(routine.exerciseId);

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
        maxWidth="430px"
        height="350px"
        minWidth="310px"
        borderRadius="15px"
        style={{ backgroundImage: `url(${exercise?.image})` }}
      >
        <div>
          <Box
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
            padding="1rem"
          >
            <Box
              width="100%"
              alignItems="flex-start"
              justifyContent="space-between"
              flexDirection="column"
              gap="1rem"
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
              <Title withBackground size="md">
                {exercise?.name}
              </Title>
            </Box>

            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap="20px"
              height="fit-content"
            >
              <Box alignItems="center" gap="1rem">
                <IconWrapper>
                  <AiFillSchedule size={15} />
                </IconWrapper>
                <Paragraph fontWeight="bold">
                  {routine.frequency} por{" "}
                  {routine.frequencyType.toLocaleLowerCase()}
                </Paragraph>
              </Box>
              <Box alignItems="center" gap="1rem">
                <IconWrapper>
                  <FaSun size={15} />
                </IconWrapper>
                <Paragraph fontWeight="bold">
                  Pela {routine.period.toLocaleLowerCase()}
                </Paragraph>
              </Box>
              <Box alignItems="center" gap="1rem">
                <IconWrapper>
                  <CgGym size={15} />
                </IconWrapper>
                <Paragraph fontWeight="bold">{routine.series} Series</Paragraph>
              </Box>
              <Box alignItems="center" gap="1rem">
                <IconWrapper>
                  <TiArrowRepeat size={15} />
                </IconWrapper>

                <Paragraph fontWeight="bold">
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
          </Box>
        </div>
      </ActivityCardContainer>
    </>
  );
}
