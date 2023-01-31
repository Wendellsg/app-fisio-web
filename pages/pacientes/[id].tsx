import { useRouter } from "next/router";
import styles from "./PacientePage.module.css";
import { RiMapPin2Fill, RiEditBoxFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiCake } from "react-icons/hi";
import { FaRulerVertical, FaWeight, FaEnvelope } from "react-icons/fa";
import RotineCard from "../../src/components/RotineCard";
import ActivityCard from "../../src/components/ActivityCard/ActivityCard";
import { useEffect, useState } from "react";
import { useWindowsDimensions } from "../../src/hooks";
export default function PacientePage() {
  const router = useRouter();
  const { id } = router.query;
  const { height, width } = useWindowsDimensions();
  return (
    <div className={styles.PacienteContainer}>
      <div>
        <h2>Paciente</h2>
        <div
          style={width && width <= 750 ? { display: "none" } : {}}
          className={styles.PacienteName}
        >
          <h1>Juliana Queiroz</h1>
          <span>#325177</span>
        </div>
      </div>
      <div className={styles.PacienteContent}>
        <div className={styles.PacienteMainColumn}>
          <div className={styles.PacienteDiagnostic}>
            <h1>Diagnóstico clínico e funcional</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className={styles.PacienteRotine}>
            <div className={styles.PacienteRotineHeader}>
              <h1>Rotinas</h1>
              <div className="ScalableButton">
                <div className={styles.PacientesAddRotineButton}>+</div>
              </div>
            </div>
            <div className={styles.PacienteRotineListe}>
              <RotineCard />
              <RotineCard />
              <RotineCard />
            </div>
          </div>
        </div>
        <div className={styles.PacienteSideColumn}>
          <div className={styles.ProfileImageBorder}>
            <img src="/assets/thais.webp" alt="Profile Image" />
          </div>

          <div
            className={`${styles["PacienteEditPacienteButton"]} ScalableButton`}
            onClick={() => router.push(`/pacientes/editar/${id}`)}
          >
            <span>Editar Paciente</span>
            <div className={styles.PacientesAddRotineButton}>
              <RiEditBoxFill
                size={35}
                className={styles.PacientesRotineBottomButtonIcon}
              />
            </div>
          </div>

          <div
            className={styles.PacienteName}
            style={width && width > 750 ? { display: "none" } : {}}
          >
            <h1>Juliana Queiroz</h1>
            <span>#325177</span>
          </div>
          <details className={styles.PacienteHighlights}>
            <summary
              style={{
                cursor: "pointer",
              }}
            >
              Ver Detalhes
            </summary>
            <div className={styles.PacienteHighlights}>
              <div className={styles.PacienteHighlightItem}>
                <HiCake size={30} className={styles.PacienteHighlightIcon} />
                <span>35 anos</span>
              </div>
              <div className={styles.PacisenteHighlightItem}>
                <FaRulerVertical
                  size={30}
                  className={styles.PacienteHighlightIcon}
                />
                <span>1,68</span>
              </div>
              <div className={styles.PacienteHighlightItem}>
                <FaWeight size={30} className={styles.PacienteHighlightIcon} />
                <span>62 Kgs</span>
              </div>
              <div className={styles.PacienteHighlightItem}>
                <IoLogoWhatsapp
                  size={30}
                  className={styles.PacienteHighlightIcon}
                />
                <span>13 98152-8674</span>
              </div>
              <div className={styles.PacienteHighlightItem}>
                <FaEnvelope
                  size={30}
                  className={styles.PacienteHighlightIcon}
                />
                <span>thais.passosolive@gmail.com</span>
              </div>
              <div className={styles.PacienteHighlightItem}>
                <RiMapPin2Fill
                  size={30}
                  className={styles.PacienteHighlightIcon}
                />
                <span>
                  Av. Ver. José Monteiro, 1655 - Setor Negrão de Lima, Goiânia -
                  GO, 74653-230
                </span>
              </div>
            </div>
          </details>

          <details className={styles.PacienteLastActivits}>
            <summary
              style={{
                cursor: "pointer",
              }}
            >
              Ultimas Atividades
            </summary>
            <div className={styles.ActivityList}>
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
