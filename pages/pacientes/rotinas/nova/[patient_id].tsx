import {
  CenteredColumn,
  CenteredRow,
  HorizontalList,
  PageContainer,
} from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import * as S from "./styles";
import { SearchInput } from "../../../../src/components/molecules/SearchInput";
import { useExercises } from "../../../../src/hooks";
import { useEffect } from "react";
import ExerciseCard from "../../../../src/components/ExerciseCard";
const NewRotineScreen = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const { exercises, getExercises } = useExercises();

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <PageContainer>
      <HilightedText size="large">Nova Rotina {patient_id}</HilightedText>
      <CenteredColumn justifyContent="flex-start">
        <CenteredRow justifyContent="flex-end" height="fit-content">
          <SearchInput
            action={(param) => {
              console.log("searching", param);
            }}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            placeholder="Pesquisar exercício..."
          />
        </CenteredRow>
      </CenteredColumn>

      <HorizontalList justifyContent="flex-start">
        {exercises.map((exercise) => (
          <ExerciseCard
            exercise={exercise}
            key={exercise.id}
            showFavoritButton
          />
        ))}
      </HorizontalList>
    </PageContainer>
  );
};

export default NewRotineScreen;
