import ActivityCard from "../../src/components/ActivityCard/ActivityCard";
import { Box } from "../../src/components/atoms/layouts";
import { Title } from "../../src/components/atoms/typograph";
import { useActivities } from "../../src/hooks/useActivities";

export default function Feed() {
  const { activities } = useActivities();
  return (
    <Box
      flexDirection="column"
      padding="2rem 2rem 0 2rem"
      overflow="auto"
      gap="1rem"
    >
      <Title withBackground>Feed de Atividades</Title>
      <Box
        flexWrap="wrap"
        gap="2rem"
        justifyContent="center"
        alignItems="flex-start"
      >
        {activities?.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </Box>
    </Box>
  );
}
