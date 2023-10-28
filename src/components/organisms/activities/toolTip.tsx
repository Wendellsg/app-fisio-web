import { THEME } from "../../../theme";
import { Activity } from "../../../types";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";

export const activitiesColors = {
  pain: THEME.colors.orange,
  effort: THEME.colors.sky,
};

export const ActivityToolTip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) => {
  if (!active || !payload?.length) return null;

  const activity: Activity = payload[0]?.payload;

  return (
    <Box
      width="200px"
      style={{
        border: "1px solid #E0E0E0",
        borderRadius: "15px",
        padding: "1rem",
        backgroundColor: "#fff",
      }}
      gap="1rem"
      flexDirection="column"
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
          <Paragraph
            fontWeight="bold"
            size="sm"
            style={{
              whiteSpace: "nowrap",
              maxWidth: "180px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activity?.comments}
          </Paragraph>
        </Box>
      )}
    </Box>
  );
};
