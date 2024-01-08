import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ProgressBar: React.FC<{
  progress: number;
  className?: string;
  onSeek?: (percentage: number) => void;
}> = ({ progress: InitialProgress, onSeek, className }) => {
  const [progress, setProgress] = useState(InitialProgress);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const getPercentageOnClick = (e: any) => {
    const rect = e.target?.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const percentage = (x / rect.width) * 100;
    return percentage;
  };

  return (
    <div
      onClick={(e) => {
        onSeek && onSeek(getPercentageOnClick(e));
      }}
      style={
        onSeek && {
          cursor: "pointer",
        }
      }
      className={cn(`flex justify-start items-center w-full gap-4 `, className)}
    >
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
};
