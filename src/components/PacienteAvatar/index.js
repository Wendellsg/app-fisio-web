import Image from 'next/image'
import styles from './PacienteAvatar.module.css'
export default function PacienteAvatar(props){
    return(
        <div className="ScalableButton">
            <div className={styles.PacienteAvatarContainer}>
                <div className={styles.PacienteAvatarImageBorder}>
                <div className={styles.PacienteAvatarImageBackground}>
                    <Image 
                    alt='imagem de perfil'
                    width={76}
                    height={76}
                    layout={'intrinsic'}
                    src={props.image}
                    className={styles.PacienteAvatarImage}/>
                </div>
                <h3>{props.name}</h3>
                </div>
            </div>
        </div>
    )
}