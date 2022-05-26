import styles from './LastNewsCard.module.css'
export default function LastNewsCard(){
    return(
        <div className={styles.lastNewsContainer}>
         <span className={styles.lastNewsTitle}>Novos exercícios adicionados</span>
         <span className={styles.lastNewsParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...</span>
        <div className="ScalableButton"><h2 className={styles.lastNewsButton}>Saiba mais</h2></div>
        </div>
    )
}