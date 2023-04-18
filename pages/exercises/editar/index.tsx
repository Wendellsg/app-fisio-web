import { useRouter } from "next/router";
import { PageContainer } from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { ExerciciesForm } from "../../../src/components/ExerciciesForm";

const NewRotineScreen = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <HilightedText size="large">Novo Exercício</HilightedText>

      <ExerciciesForm onSubmit={()=>{}}/>
    </PageContainer>
  );
};

export default NewRotineScreen;
