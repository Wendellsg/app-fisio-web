import { PatientRoutines } from "@/components/organisms/routines";

export default function RoutinesPage() {
  return (
    <div className="w-full flex items-start justify-start min-h-[80vh] p-8 flex-col h-fit overflow-y-auto">
      <PatientRoutines />
    </div>
  );
}
