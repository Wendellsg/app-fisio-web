import styles from './NavMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function NavMenu(){
    const router = useRouter();

    return(
        <div className={styles.NavMenuContainer}>
            <div className={styles.logo}>
            <Image  src={'/assets/logo.png'} alt='logo' layout='fixed' width={73} height={122}/>

            </div>

            <ul>
            <Link href="/" passHref>
                <li className={router.asPath === '/' || router.asPath.match('/profile')? styles.NavLinkActive: ''}>
                <img src={'/assets/home.png'} alt='Home'/>
                </li>
            </Link>
            <Link href="/pacientes" passHref>
                <li className={router.asPath.match('/pacientes')? styles.NavLinkActive: ''}>
                <img src={'/assets/pacientes.png'} alt='Pacientes'/>
                </li>
            </Link>
            <Link href="/exercises" passHref>
                <li className={router.asPath.match('/exercises')? styles.NavLinkActive: ''}>
                <img src={'/assets/exercicios.png'} alt='exercicios'/>
                </li >
            </Link>
            <Link href="/feed" >
                <li className={ router.asPath.match('/feed')? styles.NavLinkActive: ''}>
                <img src={'/assets/feed.png'} alt='feed'/>
                </li>
            </Link>
            </ul>
            <Link href="/suporte" >
            <div className={styles.suporteContainer}>
                <Image className={styles.suporteImage} src={'/assets/call.png'} alt='call' layout='fixed' width={23} height={23}/>
                <h4>Fale conosco</h4>
            </div>
            </Link>
        </div>
    )
}