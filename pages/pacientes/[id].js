import { useRouter } from 'next/router'

export default function PacientePage(){
    const router = useRouter()
    const { pid } = router.query

    return(
        <div>
            <h2>Paciente</h2>
        </div>
    )
}