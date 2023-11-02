import { useState } from "react";
import { Line, LineChart, Tooltip } from "recharts";
import { Exercise, Routine } from "../../../types";
import { Box } from "../../atoms/layouts";
import { Paragraph, Title } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";
import { ActivityToolTip, activitiesColors } from "./toolTip";

export const Activities = ({
  routine,
  exercise,
}: {
  routine: Routine;
  exercise: Exercise;
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const data = routine?.activities?.map((routine) => {
    return {
      ...routine,
      date: new Date(routine.createdAt).toLocaleDateString(),
    };
  });

  return (
    <Box
      width="600px"
      flexDirection="column"
      padding="2rem"
      maxHeight="70vh"
      height="fit-content"
      style={{
        overflowY: "auto",
      }}
    >
      <Title withBackground size="md">
        Histórico
      </Title>

      <Box
        margin="2rem auto"
        width="100%"
        borderRadius="15px"
        justifyContent="center"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
          border: "1px solid  #E0E0E0",
        }}
        minHeight="300px"
      >
        <LineChart width={500} height={300} data={data}>
          <Tooltip
            content={({ active, payload, label }) => (
              <ActivityToolTip
                active={active}
                payload={payload}
                label={label}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="effortLevel"
            stroke={activitiesColors.effort}
            activeDot={{ r: 8 }}
            strokeWidth={"3"}
          />
          <Line
            type="monotone"
            dataKey="painLevel"
            stroke={activitiesColors.pain}
            strokeWidth={"3"}
          />
        </LineChart>
      </Box>

      <Box gap="1rem" width="100%" alignItems="center">
        <Box gap="1rem" alignItems="center">
          <Box
            backgroundColor={activitiesColors.pain}
            padding="5px"
            borderRadius="50%"
          >
            <img
              src="/assets/pain.png"
              style={{
                width: "15px",
                height: "15px",
              }}
              alt="Dor"
            />
          </Box>
          <Paragraph
            size="sm"
            fontWeight="bold"
            style={{
              color: activitiesColors.pain,
            }}
          >
            - Nível de dor
          </Paragraph>
        </Box>

        <Box gap="1rem" alignItems="center">
          <Box
            backgroundColor={activitiesColors.effort}
            padding="5px"
            borderRadius="50%"
          >
            <img
              src="/assets/strength.png"
              style={{
                width: "15px",
                height: "15px",
              }}
              alt="Esforço"
            />
          </Box>
          <Paragraph
            fontWeight="bold"
            style={{
              color: activitiesColors.effort,
            }}
          >
            - Nível de esforço
          </Paragraph>
        </Box>
      </Box>

      <Box
        flexDirection="column"
        minHeight="fit-content"
        width="100%"
        margin="2rem 0 0 0"
      >
        {showDetails &&
          routine.activities.map((activity) => {
            return (
              <Box
                key={activity._id}
                flexDirection="column"
                margin="1rem 0"
                padding="1rem"
                width="100%"
                gap="0.5rem"
                style={{
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Box flexDirection="column">
                  <Paragraph size="xs" color="black" fontWeight="bold">
                    Data
                  </Paragraph>
                  <Paragraph fontWeight="bold" size="sm">
                    {new Date(activity?.createdAt).toLocaleDateString()}
                  </Paragraph>
                </Box>

                <Box gap="1rem">
                  <Box alignItems="center" gap="10px">
                    <Box
                      backgroundColor={activitiesColors.pain}
                      padding="5px"
                      borderRadius="50%"
                    >
                      <img
                        src="/assets/pain.png"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                        alt="Esforço"
                      />
                    </Box>
                    <Paragraph fontWeight="bold" size="md">
                      {activity?.painLevel}
                    </Paragraph>
                  </Box>

                  <Box alignItems="center" gap="10px">
                    <Box
                      backgroundColor={activitiesColors.effort}
                      padding="5px"
                      borderRadius="50%"
                    >
                      <img
                        src="/assets/strength.png"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                        alt="Esforço"
                      />
                    </Box>
                    <Paragraph fontWeight="bold" size="md">
                      {activity?.effortLevel}
                    </Paragraph>
                  </Box>
                </Box>

                {activity?.comments && (
                  <Box flexDirection="column">
                    <Paragraph size="xs" color="black" fontWeight="bold">
                      Comentário
                    </Paragraph>
                    <Paragraph fontWeight="bold" size="sm">
                      {activity?.comments}
                    </Paragraph>
                  </Box>
                )}
              </Box>
            );
          })}
      </Box>

      <Box width="100%" justifyContent="center" margin="2rem 0 0 0">
        <DefaultButton
          text={showDetails ? "Ocultar detalhes" : "Mostrar detalhes"}
          onClick={() => setShowDetails(!showDetails)}
          type="neutral"
        />
      </Box>
    </Box>
  );
};
