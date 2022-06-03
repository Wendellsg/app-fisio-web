import styles from './Pacientes.module.css'
import {useState, useEffect} from 'react'
import PacienteAvatar from '../../src/components/PacienteAvatar'
import LoadingIcone from '../../src/components/LoadingIcone'
export default function Pacientes(){
    const [searchInput, setSearchInput] = useState('')
    const [pacintes, setPaciente] = useState(null)
    const [isLoading, setIsloading] = useState(false)

    const fetchUser = () => {
        setIsloading(true)
        fetch(`https://dummyapi.io/data/v1/user?page=1&limit=30`, {
          method:'get',
          headers: {
            'Content-type':'application/json',
            'app-id':'62914bec48a5d307d256de44'
          }
        }) 
          .then(response => {
              return response.json()
          })
          .then(user=>{
            setPaciente(user.data)
            setIsloading(false)
          })
      };

    useEffect(()=>{
        fetchUser()
    },[]);


    return(
        <div className={styles.PacientesContainer}>
            <div className={styles.PacientesHeader}>
                <h2>Seus Pacientes</h2>
                <div className={styles.PacientesSearchContainer}>
                    <div className={styles.PacientesInputSearch}>
                        <img src='/assets/search.png'/>
                        <input type='text' placeholder='Pesquisar...' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                    </div>
                    <div className='ScalableButton'>
                        <div className={styles.PacientesAddButton}>
                            +
                        </div>
                    </div>
                </div>
            </div> 
            <div className={styles.PacientesList}>

            {   pacintes!==null?(
        pacintes.map(
            (pacinte, index)=>{
                return<PacienteAvatar key={pacinte.id} index={index} image={pacinte.picture} name={`${pacinte.firstName} ${pacinte.lastName}`}/>
                }
                        )
            ):(
                isLoading?(
                    <LoadingIcone/>
            ):(<div>Nenhum Paciente encontrado</div>)
            )
                
            }
            </div>
        </div>
    )
}