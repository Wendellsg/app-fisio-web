import styles from './Pacientes.module.css'
import {useState} from 'react'
import PacienteAvatar from '../../src/components/PacienteAvatar'
export default function Pacientes(){
    const [searchInput, setSearchInput] = useState('')

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
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
              <PacienteAvatar image={'/assets/thais.jpg'} name='Juliana Queiroz'/>
            </div>
        </div>
    )
}