import { useState } from "react";
import styled from "styled-components";
import { useEvolutions } from "../../../hooks/useEvolutions";
import { Evolution } from "../../../types/";
import { Box } from "../../atoms/layouts";
import { DefaultButton } from "../../molecules/Buttons";
import { TextArea } from "../../molecules/forms";

type EvolutionFormProps = {
  evolution: Evolution;
  onSubmit: () => void;
  onCancel: () => void;
};

export const EvolutionForm: React.FC<EvolutionFormProps> = ({
  evolution,
  onSubmit,
  onCancel,
}) => {
  const [newEvolution, setNewEvolution] = useState<Evolution>(evolution);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { createEvolution, updateEvolution } = useEvolutions();

  async function handleSave() {
    setSubmitting(true);

    const payload = {
      ...evolution,
      ...newEvolution,
    };

    if (evolution._id) {
      await updateEvolution(evolution._id, payload as Evolution);
      setSubmitting(false);
      onSubmit();
      return;
    }

    await createEvolution(payload as Evolution);
    setSubmitting(false);
    onSubmit();
  }

  return (
    <FormContainer
      gap="1rem"
      flexDirection="column"
      width="500px"
      height="100%"
      maxWidth="100%"
    >
      <Box width="100%" gap="1rem" flexDirection="column">
        <input
          type="date"
          value={
            new Date(newEvolution.date || new Date())
              .toISOString()
              .split("T")[0]
          }
          className="picker"
          onChange={(e) =>
            setNewEvolution((prev) => ({
              ...prev,
              date: new Date(e.target.value),
            }))
          }
        />

        <TextArea
          label="Diagnóstico clínico"
          value={newEvolution.clinicalDiagnosis}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              clinicalDiagnosis: e.target.value,
            })
          }
        />

        <TextArea
          label="Diagnóstico físico"
          value={newEvolution.physicalDiagnosis}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              physicalDiagnosis: e.target.value,
            })
          }
        />

        <TextArea
          label="Evolução"
          value={newEvolution.evolution}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              evolution: e.target.value,
            })
          }
          width="100%"
        />
      </Box>

      <Box width="100%" gap="1rem" justifyContent="flex-end">
        <DefaultButton onClick={onCancel} text="Cancelar" type="negation" />

        <DefaultButton
          onClick={handleSave}
          text="Salvar"
          type="submit"
          isLoading={submitting}
        />
      </Box>
    </FormContainer>
  );
};

const FormContainer = styled(Box)`
  width: 100%;

  @media (min-width: 968px) {
    width: 500px;
  }
`;
