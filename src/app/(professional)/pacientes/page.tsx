import { PatientList } from "@/components/organisms/patients";


export default function Pacientes() {
  

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-8 p-8">
      <PatientList />
    </div>
  );
}
