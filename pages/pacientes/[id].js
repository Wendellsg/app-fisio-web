import { useRouter } from 'next/router'
import styles from './PacientePage.module.css'
import {RiMapPin2Fill} from 'react-icons/ri'
import {IoLogoWhatsapp} from 'react-icons/io'
import {HiCake} from 'react-icons/hi'
import {FaRulerVertical, FaWeight, FaEnvelope} from 'react-icons/fa'

export default function PacientePage(){
    const router = useRouter()
    const { id } = router.query

    return(
        <div className={styles.PacienteContainer}>
            <div className={styles.PacienteMainColumn}>
                <h2>Paciente</h2>
                <div className={styles.PacienteName}><h1>Juliana Queiroz</h1><span>#325177</span></div>
                <div className={styles.PacienteDiagnostic}>
                    <h1>Diagnóstico clínico e funcional</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={styles.PacienteRotine}>
                    <h1>Rotinas</h1>
                </div>
            </div>
            <div className={styles.PacienteSideColumn}>
                <div className={styles.ProfileImageBorder}>
                    <img src="/assets/thais.webp" alt="Profile Image" />
                </div>

                <div className={styles.PacienteHighlights}>
                    <div className={styles.PacienteHighlightItem}>
                        <HiCake size={30} className={styles.PacienteHighlightIcon}/>
                        <span>35 anos</span>
                    </div>
                    <div className={styles.PacienteHighlightItem}>
                        <FaRulerVertical size={30} className={styles.PacienteHighlightIcon}/>
                        <span>1,68</span>
                    </div>
                    <div className={styles.PacienteHighlightItem}>
                        <FaWeight size={30} className={styles.PacienteHighlightIcon}/>
                        <span>62 Kgs</span>
                    </div>
                    <div className={styles.PacienteHighlightItem}>
                        <IoLogoWhatsapp size={30} className={styles.PacienteHighlightIcon}/>
                        <span>13 98152-8674</span>
                    </div>
                    <div className={styles.PacienteHighlightItem}>
                        <FaEnvelope size={30} className={styles.PacienteHighlightIcon}/>
                        <span>thais.passosolive@gmail.com</span>
                    </div>
                    <div className={styles.PacienteHighlightItem}>
                        <RiMapPin2Fill size={30} className={styles.PacienteHighlightIcon}/>
                        <span>Av. Ver. José Monteiro, 1655 - Setor Negrão de Lima, Goiânia - GO, 74653-230</span>
                    </div>
                </div>

            </div>
        </div>
    )
}