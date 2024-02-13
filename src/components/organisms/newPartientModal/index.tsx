"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input, InputBox, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { usePatients } from "../../../hooks/usePatients";

export const NewPatientModal: React.FC<{
  trigger: React.ReactNode;
}> = ({ trigger }) => {
  const [email, setEmail] = useState("");
  const [patientPreview, setPatientPreview] = useState<Partial<User> | null>(
    null
  );
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const { searchPatient, addPatient, createPatient } = usePatients();

  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    return () => {
      setPatientPreview(null);
      setEmail("");
      setCreateMode(false);
    };
  }, []);

  const Content = useMemo(() => {
    if (createMode)
      return (
        <div className="flex flex-col gap-4 w-full p-8">
          <h2 className="text-sm text-slate-400">Novo Paciente</h2>

          <p className="font-bold text-xs">
            O paciente não foi encontrado, deseja criar um novo paciente?
          </p>

          <InputBox>
            <Label htmlFor="name">Nome do paciente</Label>
            <Input
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
              value={newPatient.name}
              type="text"
              name="name"
              placeholder="Digite o nome do paciente"
            />
            <InputError>{errors.name}</InputError>
          </InputBox>

          <InputBox>
            <Label htmlFor="email">Email do paciente</Label>
            <Input
              onChange={(e) =>
                setNewPatient({ ...newPatient, email: e.target.value })
              }
              value={newPatient.email}
              type="email"
              name="email"
              id="email"
              placeholder="Digite o e-mail do paciente"
            />
            <InputError>{errors.email}</InputError>
          </InputBox>

          <div className="flex gap-4 w-full justify-center items-center mt-8">
            <Button
              variant="destructive"
              onClick={() => {
                setCreateMode(false);
              }}
              className="w-full"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full"
              onClick={async () => {
                if (!newPatient.name) {
                  setErrors({ ...errors, name: "Campo obrigatório" });
                  return;
                }
                if (!newPatient.email) {
                  setErrors({ ...errors, email: "Campo obrigatório" });
                  return;
                }
                await createPatient(newPatient);
                setErrors({});
              }}
            >
              Criar
            </Button>
          </div>
        </div>
      );

    return (
      <div className="flex flex-col gap-4 w-full p-8">
        <h2 className="text-md font-bold">Procurar paciente</h2>

        <div className="flex items-end gap-4 w-full flex-wrap justify-center">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            width="100%"
            placeholder="Digite o email do paciente"
          />

          <Button
            onClick={async () => {
              if (!email || !email.includes("@")) return;

              setLoadingPatient(true);
              const response = await searchPatient(email);
              if (!response) setCreateMode(true);
              setPatientPreview(response);
              setLoadingPatient(false);
            }}
            type="submit"
            disabled={!email || !email.includes("@")}
            className="w-full flex gap-2 items-center justify-center"
          >
            Procurar <BsSearch />
          </Button>
        </div>

        {loadingPatient && (
          <div className="flex w-full justify-start items-center gap-2">
            <Skeleton className="rounded-full w-12 h-12 object-cover border-mutted border-2" />
            <Skeleton className="w-20 h-4" />
          </div>
        )}

        {patientPreview?.id && !loadingPatient && (
          <div className="flex flex-col w-full justify-center items-center gap-4 mt-8">
            <p className="text-sm text-slate-400">Paciente encontrado</p>

            <div className="flex items-center justify-center gap-4">
              <img
                src={
                  patientPreview.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt={patientPreview.name}
                className="rounded-full w-12 h-12 object-cover border-accent border-2"
              />
              <p className="font-bold text-sm">{patientPreview.name}</p>

              <Button
                type="submit"
                onClick={() => {
                  addPatient(patientPreview.id as string);
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }, [createMode, email, patientPreview, loadingPatient, newPatient, errors]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{Content}</DialogContent>
    </Dialog>
  );
};
