import styles from './profile.module.css';

export default function Profile(){
    return(
        <div className={styles.ProfileContainer}>
            <div className={styles.ProfileFirstColumn}>
            <h1 className={styles.ProfileName}>Dra. Thais Passos</h1>
            <div className={styles.FisioInfo}>
                <h2>Fisioterapeuta</h2>
               <span>  Crefito: 340602-F</span>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            </div>
            <div className={styles.ProfileSecundColumn}>
                <div className={styles.ProfileImageBorder}>
                    <img src="/assets/thais.webp" alt="Profile Image" />
                </div>
                <div>
                    <p>Editar perfil</p>
                </div>
            </div>
            
        </div>
    );
};