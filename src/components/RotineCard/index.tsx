import styles from './RotineCard.module.css'
import {AiFillSchedule} from 'react-icons/ai'
import {FaSun, FaTrash} from 'react-icons/fa'
import {CgGym} from 'react-icons/cg'
import {TiArrowRepeat} from 'react-icons/ti'
import {MdShowChart} from 'react-icons/md'
import {RiEditBoxFill} from 'react-icons/ri'
import { useRouter } from 'next/router'

export default function RotineCard(props){

    const router = useRouter()



    const exercise = {
        category: "Pernas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/assets/image8.png",
        name: "Exercicio Massa",
        summary: "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit ",
        video: "https://www.youtube.com/watch?v=f9ibXdW82rQ",
        __v: 0,
        _id: "6298aa014be3c4714ec1b7f3",
    }

    return(
        <div className={styles.RotineCardContainer} style={{backgroundImage: "URL('/assets/atictivityimage.png'"}}>
            <div className={styles.RotineCardContainerOverlay}>
                <div className={styles.RotineContent}>
                    <div className={styles.RotineHeader}>
                        <h2>{exercise.name}</h2>
                        <div className={styles.RotineCardTools}>
                            <div className='ScalableButton'>
                                <div className={styles.PacientesRotineBottomButton}>
                                    <MdShowChart size={35} className={styles.PacientesRotineBottomButtonIcon}/>
                                </div>
                            </div>
                            <div className='ScalableButton'>
                                <div className={styles.PacientesRotineBottomButton} onClick={()=> router.push(`/pacientes/rotinas/editar/${"dwadoiwajdoiwaeawi"}`)}>
                                    <RiEditBoxFill size={35} className={styles.PacientesRotineBottomButtonIcon} />
                                </div>
                            </div>
                            <div className='ScalableButton'>
                                <div className={styles.PacientesRotineBottomButton}>
                                    <FaTrash size={35} className={styles.PacientesRotineBottomButtonIcon}/>
                                </div>
                            </div>

                    </div>
                    </div>
                   
                    <div className={styles.RotineHighLight}>

                        <div className={styles.RotineHighLightItem}>
                            <AiFillSchedule size={35} className={styles.RotineHighlightIcon}/>
                            <span>3x por semana</span>
                        </div>
                        <div className={styles.RotineHighLightItem}>
                            <FaSun size={35} className={styles.RotineHighlightIcon}/>
                            <span>Pela manhã</span>
                        </div>
                        <div className={styles.RotineHighLightItem}>
                            <CgGym size={35} className={styles.RotineHighlightIcon}/>
                            <span>10 Series</span>
                        </div>
                        <div className={styles.RotineHighLightItem}>
                            <TiArrowRepeat size={35} className={styles.RotineHighlightIcon}/>
                            <span>5 Repetições</span>
                        </div>

                    </div>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                    </p>
                </div>      
            </div>
        </div>
    )
}