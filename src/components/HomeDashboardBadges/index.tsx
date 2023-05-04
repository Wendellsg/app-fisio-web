import Image from 'next/image'
import styles from './HomeDashboardBadges.module.css'
export default function HomeDashboardBadges(){
    return(
        <div className={styles.homeDashBoard}>
            <h2  className={styles.homeDashBoardTitle}>
              Você tem
            </h2>
            <div className={styles.homeDashBoardBagdesContainer}>
              <div className={styles.homeDashBoardItem}>
                <div className={styles.homeDashBoardBagdes}>
                  <div className={styles.homeDashBoardBagdesIcons}>
                  <Image src={'/assets/pacientes.png'} alt='icone de pacientes' width={43} height={43} layout='fixed'/>
                  </div>
                  <h3>300</h3>
                </div>
                <p>Pacientes Cadastrados</p>
              </div>
              <div className={styles.homeDashBoardItem}>
                <div className={styles.homeDashBoardBagdes}>
                  <div className={styles.homeDashBoardBagdesIcons}>
                  <Image src={'/assets/heart.png'} alt='icone de favoritos' width={38} height={38} layout='fixed'/>
                  </div>
                  <h3>30</h3>
                </div>
                <p>Exercícios Favoritos</p>
              </div>
              <div className={styles.homeDashBoardItem}>
                <div className={styles.homeDashBoardBagdes}>
                  <div className={styles.homeDashBoardBagdesIcons}>
                  <Image src={'/assets/feed.png'} alt='icone de feed' width={38} height={38} layout='fixed'/>
                  </div>
                  <h3>30</h3>
                </div>
                <p>Rotinas Prescritas</p>
              </div>
            </div>

          </div>
    )
}