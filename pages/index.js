import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import HomeDashboard from '../src/components/HomeDashboardBadges'
import PacienteAvatar from '../src/components/PacienteAvatar'
import LastNewsCard from '../src/components/LastNewsCard'
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(null)
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.ProfileUserName}>
          <h1>Olá,</h1>
          <h1>Dra. Thais Passos</h1>
        </div>
      <div className={styles.profileMenu}>
          <div onClick={()=>setShowProfileMenu(!showProfileMenu)} className={styles.profileImageBorder}>
            <div className={styles.profileImageBackground}>
              <Image 
              alt='imagem de perfil'
              width={76}
              height={76}
              layout={'intrinsic'}
              src={'/assets/thais.webp'}
              className={styles.profileImage}/>
            </div>
          </div>
        <div className={styles.ProfileMenuList} >
          <ul>
          <Link href="/profile" >
            <li className={showProfileMenu?'slide-bottom':showProfileMenu===false?'slide-top':'displayNone'}>
                Ver Perfil
            </li>
          </Link>
          <Link href="/profile/edite" >
            <li className={showProfileMenu?'slide-bottom':showProfileMenu===false?'slide-top':'displayNone'}>
                Editar perfil
            </li>
          </Link>
            <li className={showProfileMenu?'slide-bottom':showProfileMenu===false?'slide-top':'displayNone'}>
                Sair
            </li>
          </ul>
        </div>
        </div>
      </div>
      <div className={styles.homeContentContainer}>
        <div className={styles.homeContentSection1}>
          <HomeDashboard />
          <div className={styles.homeLastPacientes}>
            <h2  className={styles.homeLastPacientesTitle}>
            Ultimos Pacientes
            </h2>
            <div className={styles.HomeLastPacientesList}>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={1}/>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={2}/>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={3}/>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={4}/>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={5}/>
              <PacienteAvatar image={'/assets/thais.webp'} name='Juliana Queiroz' index={6}/>            
            </div>
          </div>
        </div>
        <div className={styles.homeContentSection2}>
            <h2  className={styles.homeNewsTitle}>
                Novidades
            </h2>
            <div  className={styles.homeNewsList}>
            <LastNewsCard />
            <LastNewsCard />
            <LastNewsCard />
            <LastNewsCard />
            </div>

        </div>
      </div>
    </div>
  )
}
