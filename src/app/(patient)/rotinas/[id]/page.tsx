import { RoutineData } from "@/components/organisms/routines";

export default function RoutinePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <RoutineData routineId={params.id} />;
}
