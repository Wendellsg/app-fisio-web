import Image from 'next/image'
import styles from './PacienteAvatar.module.css'
import Link from 'next/link'
export default function PacienteAvatar(props){
    return(
        <Link href={`/pacientes/${props.id}`} passHref>
            <div className="scale-in-center" style={{animationDelay: `${props.index}0ms`}}>
                <div className={styles.PacienteAvatarContainer}>
                    <div className={`${styles["PacienteAvatarImageBorder"]} ScalableButton`} >
                        <div className={styles.PacienteAvatarImageBackground}>
                            <Image 
                            alt='imagem de perfil'
                            width={76}
                            height={76}
                            layout={'intrinsic'}
                            src={props.image}
                            className={styles.PacienteAvatarImage}/>
                        </div>
                    </div>
                    <h3>{props.name}</h3>
                </div>
            </div>
        </Link>
    )
}