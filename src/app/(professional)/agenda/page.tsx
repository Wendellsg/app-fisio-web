import { Schedule } from "@/components/organisms/schedule";



export default function SchedulePage() {

  return (
    <div

      className="w-full flex items-start justify-start min-h-[80vh] p-8 flex-col h-fit overflow-y-auto"
    >
      <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
        Agenda
      </h2>

      <Schedule/>
    </div>
  );
}


