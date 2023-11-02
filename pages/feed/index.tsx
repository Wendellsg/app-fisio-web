import ActivityCard from "../../src/components/ActivityCard/ActivityCard";
import { Box } from "../../src/components/atoms/layouts";
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
      <h2>Feed de Atividades</h2>
      <Box
        flexWrap="wrap"
        gap="2rem"
        padding="1rem"
        justifyContent="center"
        alignItems="flex-start"
      >
        {activities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Box>
    </Box>
  );
}
