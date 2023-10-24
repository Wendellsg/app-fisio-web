import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaSun, FaTrash } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { TiArrowRepeat } from "react-icons/ti";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/Apis";
import { Routine } from "../../types";
import { RoutineForm } from "../ActivityForm";
import { Modals } from "../molecules/modals";
import styles from "./routineCard.module.css";

export default function RoutineCard({
  routine,
  patientId,
  updateUser,
}: {
  routine: Routine;
  patientId: string;
  updateUser: () => void;
}) {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const { fisioFetcher } = useApi();
  const router = useRouter();

  const exercise = {
    category: "Pernas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/assets/image8.png",
    name: "Exercicio Massa",
    summary:
      "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit ",
    video: "https://www.youtube.com/watch?v=f9ibXdW82rQ",
    __v: 0,
    _id: "6298aa014be3c4714ec1b7f3",
  };

  return (
    <>
      <Modals
        isOpen={!!selectedRoutine}
        onClose={() => setSelectedRoutine(null)}
      >
        <RoutineForm
          routine={selectedRoutine}
          onSubmit={async (editedRoutine) => {
            await fisioFetcher({
              url: `/users/${patientId}/routines/${selectedRoutine._id}`,
              method: "PATCH",
              data: {
                ...selectedRoutine,
                ...editedRoutine,
              },
              callback: () => {
                updateUser();
                setSelectedRoutine(null);
                toast.success("Rotina atualizada com sucesso");
              },
            });

            return;
          }}
        />
      </Modals>

      <div
        className={styles.routineCardContainer}
        style={{ backgroundImage: "URL('/assets/atictivityimage.png'" }}
      >
        <div className={styles.routineCardContainerOverlay}>
          <div className={styles.routineContent}>
            <div className={styles.routineHeader}>
              <h2>{exercise.name}</h2>
              <div className={styles.routineCardTools}>
                <div className="ScalableButton">
                  <div className={styles.PacientesroutineBottomButton}>
                    <MdShowChart
                      size={35}
                      className={styles.PacientesroutineBottomButtonIcon}
                    />
                  </div>
                </div>
                <div className="ScalableButton">
                  <div
                    className={styles.PacientesroutineBottomButton}
                    onClick={() => setSelectedRoutine(routine)}
                  >
                    <RiEditBoxFill
                      size={35}
                      className={styles.PacientesroutineBottomButtonIcon}
                    />
                  </div>
                </div>
                <div className="ScalableButton">
                  <div className={styles.PacientesroutineBottomButton}>
                    <FaTrash
                      size={35}
                      className={styles.PacientesroutineBottomButtonIcon}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.routineHighLight}>
              <div className={styles.routineHighLightItem}>
                <AiFillSchedule
                  size={35}
                  className={styles.routineHighlightIcon}
                />
                <span>3x por semana</span>
              </div>
              <div className={styles.routineHighLightItem}>
                <FaSun size={35} className={styles.routineHighlightIcon} />
                <span>Pela manhã</span>
              </div>
              <div className={styles.routineHighLightItem}>
                <CgGym size={35} className={styles.routineHighlightIcon} />
                <span>10 Series</span>
              </div>
              <div className={styles.routineHighLightItem}>
                <TiArrowRepeat
                  size={35}
                  className={styles.routineHighlightIcon}
                />
                <span>5 Repetições</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
