import axios from "axios";

const AppFisioApi = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})


export async function getExercisesList(){
    try{
        const ExercisesList = await AppFisioApi.get('/exercises')
        return ExercisesList.data
    }catch(error){
        console.log(error)
        return null
        
    }
    
}