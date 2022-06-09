import styles from './ExecisesCard.module.css'
import {AiFillHeart} from 'react-icons/ai'
import { IconContext } from "react-icons";
export default function ExerciseCard({exercise, showFavoritButton}){
    const favorits = [
       {
           id: "62520061380ce1b28e942308"
        },
       {
           id: "625585667701280c494c85bc"
        },
       {
           id: "6255868d4317e2ede5d9f8cd"
        },
    ]
    function findFavorits(id){
      const find =  favorits.find(favorit=>favorit.id === id)
        if(find){
            return"red"
        }else{
            return "white"
        }
    }

    return(
        <div className={styles.exerciseCard} style={{backgroundImage: `url(${exercise.image||"https://blog.livup.com.br/wp-content/uploads/2020/03/alongamento.jpg"})`}} key={exercise.name}>
                        <IconContext.Provider value={{color: findFavorits(exercise._id), className: "heat-icone" }} >
                                <div style={showFavoritButton?{opacity: 1}:{opacity: 0}}>
                                    <AiFillHeart />
                                </div>
                            </IconContext.Provider>
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

