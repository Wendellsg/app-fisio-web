import styles from './OwnPlayer.module.css'
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {IoMdArrowBack} from 'react-icons/io'
export default function OwnPlayer({$videoRef}){
    return(
        <div className={styles.OwnPlayerContainer}>

            <div style={{width: '100%', display: 'flex', }}>
            <IoMdArrowBack size={50} color={'#96FFB3'} onClick={()=>$videoRef.current.play()}/>
            </div>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <AiOutlinePlayCircle size={50} color={'#96FFB3'} onClick={()=>$videoRef.current.play()}/>
            </div>
            <div style={{width: '100%'}}>
                <h2 className={styles.OwnPlayerContainerTitle}>Agachamento bilateral</h2>
            </div>
        </div>
    )
}