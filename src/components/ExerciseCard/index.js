import styles from './ExecisesCard.module.css'

export default function ExerciseCard({exercise}){

    return(
        <div className={styles.exerciseCard} style={{backgroundImage: `url(https://blog.livup.com.br/wp-content/uploads/2020/03/alongamento.jpg)`}} key={exercise.name}>
                        <div className={styles.exerciseCardInfos}>
                            <h3 className={styles.exerciseName}>
                                {exercise.name}
                            </h3>
                            <p className={styles.exerciseSummary}>
                                {exercise.summary}
                            </p>
                                
                        </div>
                        
                    </div>
    )
}

