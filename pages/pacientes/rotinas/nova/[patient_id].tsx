import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ActivityForm } from "../../../../src/components/ActivityForm";
import { Box } from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useApi } from "../../../../src/hooks/Apis";
const NewRotineScreen = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const { fisioFetcher } = useApi();
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
        routine={null}
        onSubmit={async (NewRoutine) => {
          await fisioFetcher({
            url: `/users/${patient_id}/routines`,
            method: "POST",
            data: NewRoutine,
            callback: () => {
              toast.success("Rotina criada com sucesso");
              router.push(`/pacientes/${patient_id}`);
            },
          });
        }}
      />
    </Box>
  );
};

export default NewRotineScreen;
