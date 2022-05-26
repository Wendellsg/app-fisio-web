import React,{ useEffect, useState} from 'react'
import styles from '../../styles/Exercises.module.css'
import { getExercisesList } from '../../src/api/AppFisioApi'
import ExerciseCard from '../../src/components/ExerciseCard'

export default function Exercises(){
    const[exercisesList,setExercisesList] = useState(null)
    useEffect(()=>{
        getExercisesList().then(res=>{
            setExercisesList(res)
        })
        
    },[])

    return(
        <div className={styles.Container}>
            <h1>Exercícios</h1>
            <hr/>
            <div className={styles.exercisesList}>
            {   exercisesList!==null?(
        exercisesList.map(
            (exercise)=>{
                return<ExerciseCard key={exercise._id} exercise={exercise}/>
                }
                        )
            ):(
                <div>Nenhum exercício encontrado</div>
            )
                
            }
            </div>
        </div>
    )
} 