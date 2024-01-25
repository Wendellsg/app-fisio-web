"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Line, LineChart, Tooltip } from "recharts";
import { Routine } from "../../../types";
import { ActivityToolTip, activitiesColors } from "./toolTip";

export const Activities = ({ routine }: { routine: Routine }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const data = routine?.activities?.map((routine) => {
    return {
      ...routine,
      date: new Date(routine.createdAt).toLocaleDateString(),
    };
  });

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-4 overflow-y-auto">
      <h2 className="text-md p-2 bg-primary font-bold rounded-md">Histórico</h2>

      <div className="flex justify-center w-full rounded-md bg-gradient-to-b from-white to-gray-200 border border-gray-300 my-4 mx-auto">
        <LineChart width={500} height={300} data={data}>
          <Tooltip
            content={({ active, payload, label }) => (
              <ActivityToolTip
                active={active!}
                payload={payload}
                label={label}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="effortLevel"
            stroke={activitiesColors.effort}
            activeDot={{ r: 8 }}
            strokeWidth={"3"}
          />
          <Line
            type="monotone"
            dataKey="painLevel"
            stroke={activitiesColors.pain}
            strokeWidth={"3"}
          />
        </LineChart>
      </div>

      <div className="flex gap-4 items-center w-full my-4">
        <div className="gap-4 flex items-center">
          <div
            className="p-2 rounded-full"
            style={{
              backgroundColor: activitiesColors.pain,
            }}
          >
            <img
              src="/assets/pain.png"
              style={{
                width: "15px",
                height: "15px",
                minHeight: "15px",
                minWidth: "15px",
              }}
              alt="Dor"
            />
          </div>
          <p
            style={{
              color: activitiesColors.pain,
            }}
            className="font-bold text-sm whitespace-nowrap"
          >
            - Nível de dor
          </p>
        </div>

        <div className="gap-4 flex items-center">
          <div
            className="p-2 rounded-full"
            style={{
              backgroundColor: activitiesColors.effort,
            }}
          >
            <img
              src="/assets/strength.png"
              style={{
                width: "15px",
                height: "15px",
                minHeight: "15px",
                minWidth: "15px",
              }}
              alt="Esforço"
            />
          </div>
          <p
            style={{
              color: activitiesColors.effort,
            }}
            className="font-bold text-sm whitespace-nowrap"
          >
            - Nível de esforço
          </p>
        </div>
      </div>

      <div className="flex flex-col min-h-fit w-ful mt-8">
        {showDetails &&
          routine?.activities?.map((activity) => {
            return (
              <div
                key={activity.id}
                className="flex flex-col w-full gap-2 my-4 border-b border-gray-300"
              >
                <div>
                  <p className="text-xs font-bold">Data</p>
                  <p className="text-sm font-bold text-slate-600">
                    {new Date(activity?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        backgroundColor: activitiesColors.pain,
                      }}
                      className="p-2 rounded-full"
                    >
                      <img
                        src="/assets/pain.png"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                        alt="Esforço"
                      />
                    </div>
                    <p className="font-bold text-md">{activity?.painLevel}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-full"
                      style={{
                        backgroundColor: activitiesColors.effort,
                      }}
                    >
                      <img
                        src="/assets/strength.png"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                        alt="Esforço"
                      />
                    </div>
                    <p className="font-bold text-md">{activity?.effortLevel}</p>
                  </div>
                </div>

                {activity?.comments && (
                  <div>
                    <p className="font-bold text-xs ">Comentário</p>
                    <p className="font-bold text-sm text-slate-600 mt-2">
                      {activity?.comments}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex w-full justify-center mt-8">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          type="button"
          variant={"secondary"}
        >
          {showDetails ? "Ocultar detalhes" : "Mostrar detalhes"}
        </Button>
      </div>
    </div>
  );
};
