import styles from '../../../styles/NavMenu.module.css'
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
            <Link href="/" >
                <li className={router.asPath === '/' ? styles.NavLinkActive: ''}>
                <Image src={'/assets/home.png'} alt='Home'  layout='fixed' width={42} height={42}/>
                </li>
            </Link>
            <Link href="/pacientes" >
                <li className={router.asPath === '/pacientes' ? styles.NavLinkActive: ''}>
                <Image src={'/assets/pacientes.png'} alt='Hopacientesme' layout='fixed' width={42} height={42}/>
                </li>
            </Link>
            <Link href="/exercises" >
                <li className={router.asPath === '/exercises' ? styles.NavLinkActive: ''}>
                <Image src={'/assets/exercicios.png'} alt='exercicios' layout='fixed' width={42} height={42}/>
                </li >
            </Link>
            <Link href="/feed" >
                <li className={router.asPath === '/feed' ? styles.NavLinkActive: ''}>
                <Image src={'/assets/feed.png'} alt='feed' layout='fixed' width={42} height={42}/>
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