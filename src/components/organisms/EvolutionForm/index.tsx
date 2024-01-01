"use client";
import { useState } from "react";
import styled from "styled-components";
import { useEvolutions } from "../../../hooks/useEvolutions";
import { Evolution } from "../../../types/";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full gap-4 flex-col ">
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
        <Label htmlFor="clinicalDiagnosis">Diagnóstico clínico</Label>

        <Textarea
          value={newEvolution.clinicalDiagnosis}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              clinicalDiagnosis: e.target.value,
            })
          }
          name="clinicalDiagnosis"
          id="clinicalDiagnosis"
          placeholder="Digite o diagnóstico clínico"
        />

        <Label htmlFor="physicalDiagnosis">Diagnóstico físico</Label>

        <Textarea
          value={newEvolution.physicalDiagnosis}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              physicalDiagnosis: e.target.value,
            })
          }
          name="physicalDiagnosis"
          id="physicalDiagnosis"
          placeholder="Digite o diagnóstico físico"
        />

        <Label htmlFor="evolution">Evolução</Label>

        <Textarea
          value={newEvolution.evolution}
          onChange={(e) =>
            setNewEvolution({
              ...newEvolution,
              evolution: e.target.value,
            })
          }
          name="evolution"
          id="evolution"
          placeholder="Digite a evolução"
        />
      </div>

      <div className="w-full flex gap-4 justify-end">
        <Button onClick={onCancel} variant="destructive">
          Cancelar
        </Button>

        <Button onClick={handleSave} type="submit" disabled={submitting}>
          Salvar
        </Button>
      </div>
    </div>
  );
};
