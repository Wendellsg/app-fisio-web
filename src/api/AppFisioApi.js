import axios from "axios";

const AppFisioApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 50000,
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