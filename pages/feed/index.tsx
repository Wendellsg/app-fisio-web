import ActivityCard from "../../src/components/ActivityCard/ActivityCard";
import { Box } from "../../src/components/atoms/layouts";
export default function Feed() {
  const activities = Array(15)
    .fill(1)
    .map((_, index) => {
      return {
        id: index,
        title: "Atividade",
        description: "Descrição da atividade",
        date: "2021-09-01T00:00:00.000Z",
        type: "exercise",
        patient: {
          id: "1",
          name: "Paciente",
          avatar: "https://dummyapi.io/data/v1/user?limit=10",
        },
      };
    });

  return (
    <Box flexDirection="column" padding="2rem" overflow="auto" gap="1rem">
      <h2>Feed de Atividades</h2>
      <Box
        flexWrap="wrap"
        gap="2rem"
        padding="1rem"
        justifyContent="center"
        alignItems="flex-start"
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Box>
    </Box>
  );
}
