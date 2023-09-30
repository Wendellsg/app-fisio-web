import { useRouter } from "next/router";
import { ActivityForm } from "../../../../src/components/ActivityForm";
import { Box } from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useRoutines } from "../../../../src/hooks/useRoutines";
import { Routine } from "../../../../src/types";
const NewRotineScreen = () => {
  const router = useRouter();
  const { patient_id } = router.query;

  const { createRoutine } = useRoutines();

  return (
    <Box
      flexDirection="column"
      gap="2rem"
      padding="1rem"
      overflow="auto"
      width="100%"
    >
      <HilightedText size="large">Nova Rotina</HilightedText>
      <ActivityForm
        routine={{} as Routine}
        onSubmit={(NewRoutine) => {
          console.log("Criar rotina", NewRoutine);
          //createRoutine(NewRoutine);
        }}
      />
    </Box>
  );
};

export default NewRotineScreen;
