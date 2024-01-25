import { Activity } from "@/types";
import styles from "./ActivityCard.module.css";
export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div
      className={styles.ActivityCardContainer}
      style={{
        backgroundImage: `URL(${activity.routine.exercise.image}`,

        backgroundSize: "cover",
      }}
    >
      <div className={styles.ActivityCardContainerGradient}>
        <div className={styles.ActivityCardLeftColumn}>
          <div className={styles.ActivityCardPacienteInfo}>
            <div className={styles.ActivityCardPacienteInfoImageBorder}>
              <div className={styles.ActivityCardPacienteInfoImageBackground}>
                <img
                  src={activity.routine.user.image}
                  alt="Paciente Image profile"
                />
              </div>
            </div>
            <h2>{activity.routine.user.name}</h2>
          </div>

          <div className={styles.ActivityCardActivityDetales}>
            <p>Concluiu</p>
            <h2>{activity.routine.exercise.name}</h2>
            <p>{activity.comments}</p>
          </div>
        </div>
        <div className={styles.ActivityCardRightColumn}>
          <p>{new Date(activity.createdAt).toLocaleDateString()}</p>
          <div className={styles.ActivityCardFeedbacksContainer}>
            <div className={styles.ActivityCardFeedback}>
              <div className={styles.ActivityCardFeedbackHighlight}>
                <div className={styles.ActivityCardFeedbackIcon}>
                  <img src="/assets/pain.png" />
                </div>
                <h3>{activity.painLevel}</h3>
              </div>
              <p>Nivel de dor</p>
            </div>
            <div className={styles.ActivityCardFeedback}>
              <div className={styles.ActivityCardFeedbackHighlight}>
                <div className={styles.ActivityCardFeedbackIcon}>
                  <img src="/assets/strength.png" />
                </div>
                <h3>{activity.effortLevel}</h3>
              </div>
              <p>Nivel de esforço</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
