import { activityByDoctor } from "../../types";
import styles from "./ActivityCard.module.css";
export default function ActivityCard({
  activity,
}: {
  activity: activityByDoctor;
}) {
  return (
    <div
      className={styles.ActivityCardContainer}
      style={{
        backgroundImage: `URL(${activity.exerciseImage}`,

        backgroundSize: "cover",
      }}
    >
      <div className={styles.ActivityCardContainerGradient}>
        <div className={styles.ActivityCardLeftColumn}>
          <div className={styles.ActivityCardPacienteInfo}>
            <div className={styles.ActivityCardPacienteInfoImageBorder}>
              <div className={styles.ActivityCardPacienteInfoImageBackground}>
                <img src={activity.patientImage} alt="Paciente Image profile" />
              </div>
            </div>
            <h2>{activity.patientName}</h2>
          </div>

          <div className={styles.ActivityCardActivityDetales}>
            <p>Concluiu</p>
            <h2>{activity.exerciseName}</h2>
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
