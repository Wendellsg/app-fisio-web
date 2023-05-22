import { useRouter } from "next/router";
import { Box } from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { ExerciciesForm } from "../../../src/components/ExerciciesForm";

const NewRotineScreen = () => {
  return (
    <Box>
      <HilightedText size="large">Novo Exercício</HilightedText>

      <ExerciciesForm onSubmit={() => {}} />
    </Box>
  );
};

export default NewRotineScreen;
