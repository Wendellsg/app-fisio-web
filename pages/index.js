import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import react,{useState} from 'react'

export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.ProfileUseName}>
          <h1>Olá,</h1>
          <h1>Dra. Thais Passos</h1>
        </div>
      <div className={styles.profileMenu} onClick={()=>setShowProfileMenu(!showProfileMenu)}>
        <div className={styles.profileImageBorder}>
          <div className={styles.profileImageBackground}>
            <Image 
            alt='imagem de perfil'
            width={76}
            height={76}
            layout={'intrinsic'}
            src={'/assets/thais.jpg'}
            className={styles.profileImage}/>
          </div>
        </div>
        <div className={styles.ProfileMenuList} /* style={showProfileMenu?{display: 'flex'}:{display: 'none'}} */>
          <ul>
          <Link href="/profile" >
            <li className={showProfileMenu?'slide-bottom':'slide-top'}>
                Ver Perfil
            </li>
          </Link>
          <Link href="/editprofile" >
            <li className={showProfileMenu?'slide-bottom':'slide-top'}>
                Editar perfil
            </li>
          </Link>
            <li className={showProfileMenu? 'slide-bottom':'slide-top'}>
                Sair
            </li>
          </ul>
        </div>
        </div>
      </div>
      <div className={styles.homeContentContainer}>
        <div className={styles.homeContentSection1}>
          <div className={styles.homeDashBoard}>
          <h2  className={styles.homeDashBoardTitle}>
            Você tem
          </h2>

          </div>
          <div className={styles.homeLastPacientes}>
          <h2  className={styles.homeLastPacientesTitle}>
           Ultimos Pacientes
          </h2>
          </div>
        </div>
        <div className={styles.homeContentSection2}>

        </div>
      </div>
    </div>
  )
}
