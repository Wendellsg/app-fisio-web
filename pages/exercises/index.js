import React,{ useEffect, useState} from 'react'
import styles from '../../styles/Exercises.module.css'
import { getExercisesList } from '../../src/api/AppFisioApi'
import ExerciseCard from '../../src/components/ExerciseCard'
import LoadingIcone from '../../src/components/LoadingIcone'
export default function Exercises(){
    const[exercisesList,setExercisesList] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    useEffect(()=>{
        setIsloading(true)
        getExercisesList().then(res=>{
            setExercisesList(res)
            setIsloading(false)
        })
        
    },[])

    return(
        <div className={styles.Container}>
            <h2>Exercícios</h2>
            <div className={styles.exercisesList}>
            {   exercisesList!==null?(
        exercisesList.map(
            (exercise)=>{
                return<ExerciseCard key={exercise._id} exercise={exercise}/>
                }
                        )
            ):(
                isLoading?(<LoadingIcone/>):<div>Nenhum exercício encontrado</div>
            )
                
            }
            </div>
        </div>
    )
} 