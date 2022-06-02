import styles from './ActivityCard.module.css'
export default function ActivityCard(index, props){
    return(
        <div className={styles.ActivityCardContainer} style={{backgroundImage: "URL('/assets/atictivityimage.png'"}}>
            <div className={styles.ActivityCardContainerGradient}>
                <div className={styles.ActivityCardLeftColumn}>
                    <div className={styles.ActivityCardPacienteInfo}>
                        <div className={styles.ActivityCardPacienteInfoImageBorder}>
                            <div className={styles.ActivityCardPacienteInfoImageBackground}>
                                <img src="/assets/thais.webp" alt="Paciente Image profile" />
                            </div>
                        </div>
                        <h2>Juliana Queiroz</h2>
                    </div>

                    <div className={styles.ActivityCardActivityDetales}>
                        <p>Concluiu</p>
                        <h2>Agachamento Bilateral</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                </div>
                <div className={styles.ActivityCardRightColumn}>
                    <p>17/05/2022</p>
                    <div className={styles.ActivityCardFeedbacksContainer}>
                        <div className={styles.ActivityCardFeedback}>
                            <div className={styles.ActivityCardFeedbackHighlight}>
                                <div className={styles.ActivityCardFeedbackIcon}>
                                    <img src='/assets/pain.png'/>
                                </div>
                                <h3>5</h3>
                            </div>
                            <p>Nivel de dor</p>
                        </div>
                        <div className={styles.ActivityCardFeedback}>
                            <div className={styles.ActivityCardFeedbackHighlight}>
                                <div className={styles.ActivityCardFeedbackIcon}>
                                    <img src='/assets/strength.png'/>
                                </div>
                                <h3>5</h3>
                            </div>
                            <p>Nivel de esforço</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}