import { PageContainer } from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { ActivityForm } from "../../../../src/components/ActivityForm";
import { Routine } from "../../../../src/types";
import { useRoutines } from "../../../../src/hooks/useRoutines";
const NewRotineScreen = () => {
  const router = useRouter();
  const { patient_id } = router.query;

  const { createRoutine } = useRoutines();

  return (
    <PageContainer>
      <HilightedText size="large">Nova Rotina</HilightedText>
      <ActivityForm
        routine={{} as Routine}
        onSubmit={(NewRoutine) => {
          console.log("Criar rotina", NewRoutine);
          //createRoutine(NewRoutine);
        }}
      />
    </PageContainer>
  );
};

export default NewRotineScreen;
