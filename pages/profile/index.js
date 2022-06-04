import styles from './profile.module.css';
import {BsWhatsapp, BsEnvelope} from 'react-icons/bs'
import {RiMapPinLine, RiEditBoxFill} from 'react-icons/ri'

export default function Profile(){
    return(
        <div className={styles.ProfileContainer}>
            <div className={styles.ProfileFirstColumn}>
                <div>
                <h1 className={styles.ProfileName}>Dra. Thais Passos</h1>
                <div className={styles.FisioInfo}>
                    <h2>Fisioterapeuta</h2>
                <h3>  Crefito: 340602-F</h3>
                </div>
                <p className={styles.ProfileResume}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>
                
                <div className={styles.ProfileContacts}>
                    <div className={styles.ProfileContact}>
                        <BsWhatsapp size={53} className={styles.ProfileContactIcon}/>
                        <span>13 98252-8674</span>
                    </div>
                    <div className={styles.ProfileContact}>
                        <BsEnvelope size={53} className={styles.ProfileContactIcon}/>
                        <span>thais.passosolive@gmail.com</span>
                    </div>

                    <div className={styles.ProfileContact}>
                        <RiMapPinLine size={53} className={styles.ProfileContactIcon}/>
                        <span>Av. Ver. José Monteiro, 1655 - Setor Negrão de Lima, Goiânia - GO, 74653-230</span>
                    </div>

                </div>
            </div>
            <div className={styles.ProfileSecundColumn}>
                <div className={styles.ProfileImageBorder}>
                    <img src="/assets/thais.webp" alt="Profile Image" />
                </div>
                <div className={styles.EditPerfilButton}>
                    <p>Editar perfil</p>
                    <RiEditBoxFill color={"#000"} size={40} style={{minWidth: "20px"}} className={styles.EditPerfilButtonIcon}/>
                </div>
            </div>
            
        </div>
    );
};