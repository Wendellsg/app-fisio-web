import { Box } from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { ActivityForm } from "../../../../src/components/ActivityForm";
import { Routine } from "../../../../src/types";
import { useRoutines } from "../../../../src/hooks/useRoutines";
import { useEffect } from "react";
const EditRotineScreen = () => {
  const router = useRouter();
  const { routineId } = router.query;

  const { routine, getRoutine, updateRoutine } = useRoutines();

  useEffect(() => {
    if (routineId) {
      getRoutine(routineId as string);
    }
  }, [routineId]);

  return (
    <Box>
      <HilightedText size="large">Nova Rotina</HilightedText>
      <ActivityForm
        routine={routine}
        onSubmit={(UpdatedRoutine) => {
          console.log("Atualizar rotina", UpdatedRoutine);
          //updateRoutine(UpdatedRoutine);
        }}
      />
    </Box>
  );
};

export default EditRotineScreen;
